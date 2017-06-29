var mongoose = require('mongoose');
var merchandiseSchema = require('./merchandise.schema.server');
var merchandiseModel = mongoose.model('merchandiseModel', merchandiseSchema);


merchandiseModel.createMerchandise = createMerchandise;
merchandiseModel.updateMerchandise = updateMerchandise;
merchandiseModel.deleteMerchandise = deleteMerchandise;

merchandiseModel.findAllMerchandisesForStore = findAllMerchandisesForStore;
merchandiseModel.findMerchandiseById = findMerchandiseById;
merchandiseModel.findAllMerchandises = findAllMerchandises;
merchandiseModel.findMerchandiseByName = findMerchandiseByName;

merchandiseModel.uploadImage = uploadImage;


module.exports = merchandiseModel;


function uploadImage(merchandiseId, filename) {
    return merchandiseModel.update({_id: merchandiseId}, {$set: {image: '/uploads/merchandise/picture/' + filename}});
}

function findAllMerchandises() {
    return merchandiseModel
        .find()
        .populate('_store')
        .exec();
}

function createMerchandise(store, merchandise) {
    merchandise._store = store;
    merchandise.dateCreated = Date.now();
    merchandise.dateUpdated = Date.now();
    return merchandiseModel
        .create(merchandise)
        .then(function (merchandise) {
            return merchandise;
        })
}


function findAllMerchandisesForStore(store) {
    return merchandiseModel
        .find({_store: store})
        .exec();
}

function findMerchandiseById(merchandiseId) {
    return merchandiseModel
        .findById(merchandiseId)
        .populate("_store", "_owner")
        .exec();
}

function findMerchandiseByName(merchandiseName) {

    return merchandiseModel
        .find({name: new RegExp(merchandiseName, "i")})
        .populate("_store")
        .exec();
}

function updateMerchandise(merchandiseId, merchandise) {
    merchandise.dateUpdated = Date.now();
    return merchandiseModel.update({_id: merchandiseId}, {$set: merchandise});
}

function deleteMerchandise(merchandiseId) {
    return merchandiseModel.remove({_id: merchandiseId}).exec();
}



