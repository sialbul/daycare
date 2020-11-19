const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbauth')
const { getAllWarnings, postOneWarning } = require('./handlers/warnings');
const { signup, login, uploadImage } = require('./handlers/users')

//Warning routes
app.get('/warnings', getAllWarnings);
app.post('/warning', FBAuth, postOneWarning);

//Users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);

exports.api = functions.https.onRequest(app);