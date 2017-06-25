var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String},
    firstName: String,
    lastName: String,
    email: String,
    photo: String,
    bmr: Number,

    role: {
        type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN', 'RECIPEPRO', 'MERCHANT']
    },

    google: {
        id: String,
        token: String
    },

    dailyCalorieBurned: Number,

    messages: [{type: mongoose.Schema.ObjectId, ref: 'commentModel'}],

    // followers: [String],
    // followings: [String]

    followers: [{type: mongoose.Schema.ObjectId, ref:'userModel'}],
    followings: [{type: mongoose.Schema.ObjectId, ref: 'userModel'}]

}, {collection: "user"});


module.exports = userSchema;

// likedRecipes: [{type: mongoose.Schema.ObjectId, ref: 'recipeModel'}]
//     collectedProducts: [{type: mongoose.Schema.ObjectId, ref: 'productModel'}]