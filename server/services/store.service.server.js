var app = require('../../express');
var multer = require('multer');
var upload = multer({dest: __dirname + '/../../public/uploads/store/profile'});

var storeModel = require('../models/store/store.model.server');

var passport = require('./user.service.server');

app.post('/api/owner/:ownerId/store', createStore);
app.get('/api/owner/:ownerId/store', findAllStoresForOwner);
app.get('/api/store/:storeId', passport.isMerchant,findStoreById);
app.put('/api/store/:storeId', updateStore);
app.get('/api/store', findStoreByName);
app.delete('/api/store/:storeId', deleteStore);

app.get('/api/stores', isAdmin, findAllStores);

app.post('/api/upload/store/profile', upload.single('myFile'), uploadImage);


function uploadImage(req, res) {
    if (req.file === undefined) {
        res.status(404);
        return;
    }

    var myFile = req.file;
    var storeId = req.body.storeId;
    var filename = myFile.filename;

    storeModel
        .uploadImage(storeId,filename)
        .then(function (status) {
            var callbackUrl = "/#!/store/"+storeId;
            res.redirect(callbackUrl)
        });
}

function findStoreByName(req, res) {
    var name = req.query.name;

    storeModel
        .findStoreByName(name)
        .then(function (store) {
            res.json(store);
        })
}

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

function findAllStores(req, res) {
    storeModel
        .findAllStores()
        .then(function (stores) {
            res.json(stores);
        })
        .catch(function (err) {
            res.send(err);
        })
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

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'ADMIN') {
        next();
    } else {
        res.sendStatus(401);
    }
}

