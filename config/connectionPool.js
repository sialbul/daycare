const { MongoClient } = require('mongodb');
let db;
let client;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 20,
};

const mongodbConnect = async() => {
    try {
        client = await MongoClient.connect(process.env.MONGODB_URI, options);
        db = client.db();
    } catch (error) {
        console.log(error);
    }
};

const dbTest = () => {
    return new Promise((resolve, reject) => {
        db.command({ ping: 1 }, function(error, result) {
            if (error) reject(error);
            resolve(result);
        });
    });
};

const getDb = () => db;
const getClient = () => client;

module.exports = { mongodbConnect, getDb, dbTest, getClient };