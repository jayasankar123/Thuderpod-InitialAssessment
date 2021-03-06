
//const mongodb = require('mongodb');

const mongoURI = "mongodb://localhost:27017" + "/thunderpodUsers"

let mongoose = require('mongoose');
const { tallySchema } = require('./schema')


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });
collection_connection = mongoose.model('user', tallySchema)


exports.connection = collection_connection;
