const admin = require('firebase-admin');
const functions = require('firebase-functions');
const app = require('express')();

require("dotenv").config();

admin.initializeApp();

const config = {
    apiKey: process.env.FIREBASE_APP_ID,
    authDomain: "daycare-43ca0.firebaseapp.com",
    databaseURL: "https://daycare-43ca0.firebaseio.com",
    projectId: "daycare-43ca0",
    storageBucket: "daycare-43ca0.appspot.com",
    messagingSenderId: "922521527054",
    appId: "1:922521527054:web:001a06c29ffd2fdd1eed5f",
    measurementId: "G-YGMSDQHWK2"
};

const firebase = require('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

app.get('/warnings', (req, res) => {
    db.collection('warnings')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let warnings = [];
            data.forEach((doc) => {
                warnings.push({
                    warningId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                });
            });
            return res.json(warnings);
        })
        .catch((err) => console.error(err));
});

app.post('/warning', (req, res) => {
    const newWarning = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };
    db.collection('warnings')
        .add(newWarning)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully` });
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
        })
})

//signup route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    //validate data
    let token, userId;

    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if (doc.exist) {
                return res.status(400).json({
                    handle: 'this handle is laready taken'
                });
            } else {
                return firebase
                    .auth().createUserWithEmailAndPassword(newUser.email, newUser.password)

            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken()
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId
            };
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email is already in use' })
            } else {
                return res.status(500).json({ error: err.code });
            }
        });
});


exports.api = functions.https.onRequest(app);