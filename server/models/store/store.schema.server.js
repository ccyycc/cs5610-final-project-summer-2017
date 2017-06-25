var mongoose = require('mongoose');
var storeSchema = mongoose.Schema({
    _owner: {type: mongoose.Schema.ObjectId, ref: 'userModel', required: true},
    name: {type: String, required: true},
    description: String,
    hours: [{open: {type: Date}, close: {type: Date}}],
    image: String,
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    dateCreated: {type: Date, default: Date.now, required: true}
}, {collection: "store"});

module.exports = storeSchema;