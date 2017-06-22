var mongoose = require('mongoose');
var merchandiseSchema = mongoose.Schema({
    // _seller: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "UserModel",
    //     required:true
    // },
    _source: {
        type: String,
        default:"123"
    },
    _target: {
        type: String,
        default:"123"
    },
    name: {type: String, required: true},
    description: String,
    image:String,
    price: Number,
    unit:String,
    comments: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "UserModel",
            required: true
        },
        content: {
            type: String,
            required: true},
        dateCreated: {
            type: Date,
            default: Date.now
        },
        dateUpdated: {
            type: Date,
            default: Date.now
        }
    }],
    dateCreated: {type: Date, default: Date.now, required:true}
}, {collection: "merchandise"});

module.exports = merchandiseSchema;