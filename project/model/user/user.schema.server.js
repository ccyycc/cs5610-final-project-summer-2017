var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,

    roles: [{
        type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN', 'RECIPEPRO', 'MERCHANT']
    }],

    google: {
        id: String,
        token: String
    },

    followers: [{type: mongoose.Schema.ObjectId, ref:'userModel'}],
    followings: [{type: mongoose.Schema.ObjectId, ref:'userModel'}],
    likedRecipes:[{type:mongoose.Schema.ObjectId, ref:'recipeModel'}],
    productsCollection:[{type:mongoose.Schema.ObjectId, ref:'productModel'}]
}, {collection: "user"});


module.exports = userSchema;