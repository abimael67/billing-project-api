const mongoose = require('./mongoose');

var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection(process.env.MONGODB_URI);

autoIncrement.initialize(connection);

module.exports = autoIncrement;