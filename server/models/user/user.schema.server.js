var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String},
    firstName: String,
    lastName: String,
    email: String,
    photo: String,

    roles: [{
        type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN', 'RECIPEPRO', 'MERCHANT']
    }],

    google: {
        id: String,
        token: String
    },

    dailyCalorieBurned: Number,

    messages:[{type: mongoose.Schema.ObjectId, ref: 'messageModel'}],

    followers: [{type: mongoose.Schema.ObjectId, ref: 'userModel'}],
    followings: [{type: mongoose.Schema.ObjectId, ref: 'userModel'}],
    // likedRecipes: [{type: mongoose.Schema.ObjectId, ref: 'recipeModel'}],
    // collectedProducts: [{type: mongoose.Schema.ObjectId, ref: 'productModel'}]
}, {collection: "user"});


module.exports = userSchema;