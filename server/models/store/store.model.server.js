var mongoose = require('mongoose');
var storeSchema = require('./store.schema.server');
var storeModel = mongoose.model('storeModel', storeSchema);

storeModel.createStore = createStore;
storeModel.updateStore = updateStore;
storeModel.deleteStore = deleteStore;

storeModel.findAllStoresForOwner = findAllStoresForOwner;
storeModel.findStoreById = findStoreById;
storeModel.findAllStores = findAllStores;
storeModel.findStoreByNameParams = findStoreByNameParams;
storeModel.findStoreByName = findStoreByName;

storeModel.uploadImage = uploadImage;

module.exports = storeModel;

function findStoreByNameParams(storeName) {
    return storeModel
        .find({name: new RegExp(storeName, "i")})
        .populate("_owner")
        .exec();
}

function createStore(owner, store) {
    store._owner = owner;
    store.dateCreated = Date.now();
    return storeModel
        .create(store)
        .then(function (store) {
            return store;
        })
}

function findStoreByName(name) {
    return storeModel
        .findOne({'name': name})
        .then(function (store) {
            return store;
        })
}

function findAllStoresForOwner(owner) {
    return storeModel
        .find({_owner: owner})
        .then(function (data) {
            var tmp = data;
            return data;
        })
}

function findAllStores() {
    return storeModel
        .find()
        .populate('_owner')
        .exec()
        .then(function (data) {
            return data;
        })
}

function findStoreById(storeId) {
    return storeModel.findById(storeId);
}


function updateStore(storeId, store) {
    store.dateUpdated = Date.now();
    return storeModel.update({_id: storeId}, {$set: store});
}

function deleteStore(storeId) {
    return storeModel.remove({_id: storeId}).exec();
}


function uploadImage(storeId, filename) {
    return storeModel.update({_id: storeId}, {$set: {image: '/uploads/store/profile/' + filename}});
}


