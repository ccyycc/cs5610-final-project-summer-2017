var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    _creator: {type: mongoose.Schema.ObjectId, ref: 'userModel'},
    name: {type: String, required: true},
    yummlyId: String,
    source: {type: String, default:'LOCAL', enum:['LOCAL', 'YUMMLY']},
    numberOfServings: Number,
    description: String,
    // ingredients: [{type: mongoose.Schema.ObjectId, ref: 'ingredientModel'}],
    ingredients:[{
        name: String,
        description: String
    }],
    instruction: [String],
    totalTime: Number,
    image: String,
    likedUsers: [{type: mongoose.Schema.ObjectId, ref: 'userModel'}],
    // rating: {type: Number, default: 0},
    //TODO: store association in recipe?
    comments: {type: mongoose.Schema.ObjectId, ref: 'commentModel'},
    dateCreated: {type: Date, default: Date.now},
    dateModified: {type: Date, default: Date.now}
}, {collection: 'recipe'});

module.exports = recipeSchema;