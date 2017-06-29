var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    _creator: {type: mongoose.Schema.ObjectId, ref: 'userModel'},
    name: {type: String, required: true},
    yummlyId: String,
    source: {type: String, default: 'LOCAL', enum: ['LOCAL', 'YUMMLY']},
    numberOfServings: Number,
    description: String,
    ingredients: [{
        name: String,
        description: String
    }],
    instruction: String,
    totalTime: Number,
    image: {type: String, default: '/uploads/recipe/..'},
    dateCreated: {type: Date, default: Date.now},
    dateModified: {type: Date, default: Date.now}
}, {collection: 'recipe'});

module.exports = recipeSchema;