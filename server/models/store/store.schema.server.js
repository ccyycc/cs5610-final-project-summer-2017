var mongoose = require('mongoose');
var merchandiseSchema = mongoose.Schema({
    // _seller: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "UserModel",
    //     required:true
    // },
    _owner: {
        type: String,
        default: "123"
    },
    name: {type: String, required: true},
    description: String,
    hours: [{open: {type: Date}, close: {type: Date}}],
    image: String,
    address: {
        street:String,
        city:String,
        state:String,
        zip:String
    },
    dateCreated: {type: Date, default: Date.now, required: true}
}, {collection: "store"});

module.exports = merchandiseSchema;

// comments: [{
//     user: {
//         type: mongoose.Schema.ObjectId,
//         ref: "UserModel",
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     dateCreated: {
//         type: Date,
//         default: Date.now
//     },
//     dateUpdated: {
//         type: Date,
//         default: Date.now
//     }
// }],