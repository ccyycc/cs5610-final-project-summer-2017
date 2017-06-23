var app = require('../../express');
var storeModel = require('../models/store/store.model.server');

var passport = require('./user.service.server');

app.post('/api/owner/:ownerId/store', createStore);
app.get('/api/owner/:ownerId/store', findAllStoresForOwner);
app.get('/api/store/:storeId', passport.isMerchant,findStoreById);
app.put('/api/store/:storeId', updateStore);
app.delete('/api/store/:storeId', deleteStore);


function createStore(req, res) {

    var store = req.body;
    var ownerId = req.params.ownerId;
    storeModel
        .createStore(ownerId, store)
        .then(function (store) {
                res.status(200).json(store);
            },
            function () {
                res.sendStatus(500);
            }
        )
}

function findAllStoresForOwner(req, res) {
    var ownerId = req.params.ownerId + "";

    storeModel
        .findAllStoresForOwner(ownerId)
        .then(function (stores) {
            var tmp = stores;
                res.status(200).send(stores);

            },
            function () {
                res.sendStatus(500);
            });
}

function findStoreById(req, res) {
    var storeId = req.params.storeId + "";

    storeModel
        .findStoreById(storeId)
        .then(
            function (store) {
                var tmp = store;
                res.status(200).send(store);
            },
            function () {
                res.sendStatus(500);
            }
        )
}

function updateStore(req, res) {
    var storeId = req.params.storeId + "";
    var store = req.body;

    storeModel
        .updateStore(storeId, store)
        .then(
            function (store) {
                res.status(200).send(store);
            },
            function () {
                res.sendStatus(500);
            }
        )

}

function deleteStore(req, res) {
    var storeId = req.params.storeId + "";

    storeModel
        .deleteStore(storeId)
        .then(
            function () {
                res.status(200).send("store delete successfully");
            },
            function () {
                res.sendStatus(500);
            }
        )
}


