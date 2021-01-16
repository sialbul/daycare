require('dotenv').config();
// loads the contents of the .env file into node's process.env object so they're available anywhere on the server

const express = require('express');
const app = express();

const path = require('path');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { mongodbConnect } = require('./config/connectionPool'); // use this line if you're using a MongoDB database

app.use(require('./controllers/testController'));

mongodbConnect() // use this line if you're using a MongoDB database
    .then(() => {
        app.use('/api', require('./controllers'));
    })
    .catch((error) => {
        console.log('An error occurred connecting to the database!', error.message);
        app.get('/api/*', (req, res) => {
            res.status(500).json({ Error: 'There is no connection to the database!' });
        });
    })
    .finally(() => {
        // and finally, whether there's a database connection or not, load the React app for all non-api routes
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, 'client/build')));
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, 'client/build/index.html'));
            });
        }
    });

app.listen(PORT, () => console.log('Server is listening on port ' + PORT));

module.exports = app;