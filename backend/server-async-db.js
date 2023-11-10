require('module-alias/register');
// Import the Express.js app
const app = require('./app');
// import environmental variables from our variables.env file
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });
// Import the 'glob' and 'path' modules
const glob = require('glob');
const path = require('path');
// Import the database connector
const dbConnect = require('./db.js');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 14 || (major === 14 && minor <= 0)) {
  console.log('Please go to nodejs.org and download version 8 or greater. 👌\n ');
  process.exit();
}

/**
 * This code dynamically loads and executes all JavaScript files under the 'models' directory
 * It's often used in Node.js projects to load modules or code from multiple files at once
 * This is useful for plugins, extensions, or any situation where you want to organize code in separate files
 */

// Use 'glob.sync' to find all JavaScript files in the './models' directory and its subdirectories
// The pattern './models/**/*.js' matches all .js files in the 'models' directory and its subdirectories
const files = glob.sync('./models/**/*.js');

// Iterate through the array of file paths returned by 'glob.sync'
files.forEach(function (file) {
  // Resolve the file path to an absolute path, ensuring it's in the correct format
  const absolutePath = path.resolve(file);

  // Require the JavaScript file using the resolved absolute path
  // This loads and executes the code from each .js file found by 'glob'
  require(absolutePath);
});

async function startServer() {
  await dbConnect();
  app.set('port', process.env.PORT || 8888);
  const server = app.listen(app.get(`port`), () => {
    `🛡️ EXPRESS server listening on port: ${server.address().port} 🛡️`;
  });

  // DOWNLOAD AND SAVE GEO CLUSTER DATA OFFLINE
  await cacheAPIData();
}

// Start our app/server!
startServer();
