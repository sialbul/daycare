const { db } = require('../util/admin');

exports.getAllWarnings = (req, res) => {
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
}

exports.postOneWarning = (req, res) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty' })
    }
    const newWarning = {
        body: req.body.body,
        userHandle: req.user.handle,
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
}