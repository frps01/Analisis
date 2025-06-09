const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config();
const path = require('path');

var retryCounter = 0; // [NEW] Counter to track number of connection retries

const routes = require('./src/routes/index');
const database = require('./src/db'); // [CHANGED] Switched from single connection to pool-based database import

const ensayoRoutes = require('./src/routes/ensayoRoutes');


/**
 * Starts the Express server once the database connection is established
 */
const startServer = () => {
    app.use(morgan('dev'));
    app.use(express.json());

    app.use(express.static(path.join(__dirname, 'public'))); // Serve static frontend first
    app.use('/ensayos', ensayoRoutes);                       // Scoped route
    app.use(routes);                                         // Other routes

    app.listen(process.env.PORT_API, () => {
        console.log(`Server running on port ${process.env.PORT_API}`);
    });
};

/**
 * Attempts to get a database connection.
 * If unsuccessful, retries every 3 seconds.
 */
const connectWithRetry = () => {
    // [CHANGED] Previously used .connect(); now using .getConnection() due to use of connection pool
    database.getConnection((err, connection) => {
        if (err) {
            console.log('Database not ready yet, retrying in 5 seconds...');
            console.log('-Retry Count :', retryCounter++);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log('Database connected successfully!');
            connection.release(); // [NEW] Return the connection to the pool
            startServer();
        }
    });
};

connectWithRetry();  // [NEW] Entry point using retry logic

