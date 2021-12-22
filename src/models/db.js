const mongoose = require('mongoose');
const config = require('../config/config')

let dbURI = config.dbURI

// Connect to the database
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
}).catch((err) => {
    console.log(err);
    console.log('error connecting to the database');
    process.exit();
});
// Database state debug messages
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}.`);
});

mongoose.connection.on('error', error => {
    console.log('Mongoose connection error: ', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose not connected.');
});


// Close connection to the database
const safeExit = (message, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose closed the connection via '${message}'.`);
        callback();
    });
};


// Nodemon restart
process.once('SIGUSR2', () => {
    safeExit('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});


// Exit application
process.on('SIGINT', () => {
    safeExit('Exit application', () => {
        process.exit(0);
    });
});


require('./users');
