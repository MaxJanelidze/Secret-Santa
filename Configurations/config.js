require('dotenv').config();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const db = mongoose.connect(process.env.URI, {useMongoClient: true});

module.exports = db;