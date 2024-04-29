const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
let db = null;

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected successfully to db server');
    db = client.db('myproject'); // Set the database reference
});

// Create user account using the collection.insertOne function
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = { name, email, password, balance: 0 };
        collection.insertOne(doc, { w: 1 }, function (err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
}

// Find user account
function find(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
}

// Find user account (single document)
function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    });
}

// Update - deposit/withdraw amount
function update(email, amount) {
    return new Promise((resolve, reject) => {
        const updatedCustomers = db.collection('users').findOneAndUpdate(
            { email: email },
            { $inc: { balance: amount } },
            { returnOriginal: false },
            function (err, updatedDoc) {
                err ? reject(err) : resolve(updatedDoc);
            }
        );
    });
}

// Return all users using the collection.find method
function all() {
    return new Promise((resolve, reject) => {
        const customer = db.collection('users').find({}).toArray(function (err, docs) {
            err ? reject(err) : resolve(docs);
        });
    });
}

module.exports = { create, findOne, find, update, all };
