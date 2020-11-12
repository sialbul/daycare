const admin = require('firebase-admin');
const functions = require('firebase-functions');
const app = require('express')();

admin.initializeApp();

const config = {
    apiKey: process.env.FIREBASE_APP_APP_ID,
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

app.get('/students', (req, res) => {
    db.collection('students')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let students = [];
            data.forEach((doc) => {
                students.push({
                    studentId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                });
            });
            return res.json(students);
        })
        .catch((err) => console.error(err));
});

app.post('/student', (req, res) => {
    const newStudent = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };
    db.collection('students')
        .add(newStudent)
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
    const newStudent = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    //validate data
    let token, studentId;

    db.doc(`/users/${newStudent.handle}`).get()
        .then(doc => {
            if (doc.exist) {
                return res.status(400).json({
                    handle: 'this handle is laready taken'
                });
            } else {
                return firebase
                    .auth().createUserWithEmailAndPassword(newStudent.email, newStudent.password)

            }
        })
        .then(data => {
            studentId = data.user.uid;
            return data.user.getIdToken()
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                handle: newStudent.handle,
                email: newStudent.email,
                createdAt: new Date().toISOString(),
                studentId
            };
            return db.doc(`/users/${newStudent.handle}`).set(userCredentials);
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