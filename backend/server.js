require('module-alias/register');
const mongoose = require('mongoose');
// import environmental variables from our variables.env file
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });
// Import the 'glob' and 'path' modules
const glob = require('glob');
const path = require('path');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 14 || (major === 14 && minor <= 0)) {
  console.log('Please go to nodejs.org and download version 8 or greater. 👌\n ');
  process.exit();
}

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (error) => {
  console.log(
    `1. 🔥 Common problem that probably caused issue → check your .env file first and add your mongodb url`
  );
  console.error({error})
  // console.error(`🚫 Error → ${error.message}`);
});

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

// This code dynamically loads and executes all JavaScript files under the 'models' directory
// It's often used in Node.js projects to load modules or code from multiple files at once
// This is useful for plugins, extensions, or any situation where you want to organize code in separate files

// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → On PORT : ${server.address().port}`);
});