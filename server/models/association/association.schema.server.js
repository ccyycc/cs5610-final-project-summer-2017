var mongoose = require('mongoose');

var associationSchema = mongoose.Schema({
    content: String,
    fromWhom: {type: mongoose.Schema.ObjectId, ref: 'userModel'},
    toWhom: {type: mongoose.Schema.ObjectId, ref: 'userModel'},
    toRecipe: {type: mongoose.Schema.ObjectId, ref: 'recipeModel'},
    time: {type: Date, default: Date.now},
    type: {
        type: String, enum: ['COMMENT', 'LIKE']
    }
}, {collection: "association"});


module.exports = associationSchema;