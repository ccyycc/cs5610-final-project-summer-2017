var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    content: String,
    fromWhom: {type: mongoose.Schema.ObjectId, ref: 'userModel'},
    toWhom:{type: mongoose.Schema.ObjectId, ref: 'userModel'},
    time:{type: Date,default:Date.now},
    type:{type:String, enum:['MESSAGE', 'STOREREVIEW', 'RECIPEREVIEW']
    }
}, {collection: "comment"});


module.exports = commentSchema;