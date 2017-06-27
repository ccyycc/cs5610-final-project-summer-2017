var mongoose = require('mongoose');
var merchandiseSchema = mongoose.Schema({
    // _seller: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "UserModel",
    //     required:true
    // },
    _store: {type: mongoose.Schema.ObjectId, ref: 'storeModel'},
    name: {type: String},
    description: String,
    image: {type: String, default: '/uploads/merchandise/..'},
    price: Number,
    unit: String,
    comments: [{type: String}],
    dateCreated: {type: Date, default: Date.now},
    dateUpdated: {type: Date, default: Date.now}
}, {collection: "merchandise"});

module.exports = merchandiseSchema;