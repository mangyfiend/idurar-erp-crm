// const chalk = require('./utils/chalk-messages.js');
const mongoose = require('mongoose');

// EXPORT DB. CONNECTION
async function DB_CONNECT() {
  try {
    // console.log(chalk.working('Connecting to the remote MongoDB Atlas DB...'));
    console.log('Connecting to the remote MongoDB Atlas DB...');

    // Surpress `strictQuery` deprecation warning
    mongoose.set(`strictQuery`, false);

    mongoose
      .connect(process.env.DATABASE, {
        // handle mongoDB deprecation warnings
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((connectionObject) => {
        // console.log((connectionObject))
        // console.log(chalk.connected('YOU CONNECTED TO THE ATLAS DATABASE SUCCESSFULLY '));
        console.log('YOU CONNECTED TO THE ATLAS DATABASE SUCCESSFULLY ');
      })
      .catch((mongooseConnectError) => {
        console.log(
          // chalk.fail(`ERROR CONNECTING TO THE REMOTE DATABASE. CHECK YOUR INTERNET CONNECTION. `)
          `ERROR CONNECTING TO THE REMOTE ATLAS DATABASE.`
        );
        // console.log(chalk.fail(`${mongooseConnectError.message}`));
        // console.log(`${mongooseConnectError.message}`);
        console.log({ mongooseConnectError });
        process.exit();
      });
  } catch (dbConnectErr) {
    // console.log(chalk.fail(`dbConnectErr: ${dbConnectErr.message}`));
    console.log(`dbConnectErr: ${dbConnectErr.message}`);
    process.exit();
  }
}

module.exports = DB_CONNECT;
