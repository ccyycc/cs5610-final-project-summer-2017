var mongoose = require('mongoose');
var merchandiseSchema = require('./merchandise.schema.server');
var merchandiseModel = mongoose.model('merchandiseModel', merchandiseSchema);


merchandiseModel.createMerchandise = createMerchandise;
merchandiseModel.findAllMerchandisesForSeller = findAllMerchandisesForSeller;
merchandiseModel.findMerchandiseById = findMerchandiseById;
merchandiseModel.updateMerchandise = updateMerchandise;
merchandiseModel.deleteMerchandise = deleteMerchandise;


module.exports = merchandiseModel;


function createMerchandise(seller, merchandise) {
    merchandise._seller = seller;
    merchandise.dateCreated = Date.now();
    merchandise.dateUpdated = Date.now();
    return merchandiseModel
        .create(merchandise)
        .then(function (merchandise) {
            return merchandise;
        })
}


function findAllMerchandisesForSeller(seller) {
    return merchandiseModel
        .find({_seller: seller})
        .exec();
}

function findMerchandiseById(merchandiseId) {
    return merchandiseModel.findById(merchandiseId);
}


function updateMerchandise(merchandiseId, merchandise) {
    merchandise.dateUpdated = Date.now();
    return merchandiseModel.update({_id: merchandiseId}, {$set: merchandise});
}

function deleteMerchandise(merchandiseId) {
    return merchandiseModel.remove({_id:merchandiseId}).exec();
}



