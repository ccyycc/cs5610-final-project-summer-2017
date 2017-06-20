var app = require('../../express');
var merchandiseModel = require('../models/merchandise/merchandise.model.server');

app.post('/api/seller/:sellerId/merchandise', createMerchandise);
app.get('/api/seller/:sellerId/merchandise', findAllMerchandisesForSeller);
app.get('/api/merchandise/:merchandiseId', findMerchandiseById);
app.put('/api/merchandise/:merchandiseId', updateMerchandise);
app.delete('/api/merchandise/:merchandiseId', deleteMerchandise);

function createMerchandise(req, res) {
    var merchandise = req.body;
    var sellerId = req.params.sellerId;
    merchandiseModel
        .createMerchandise(sellerId, merchandise)
        .then(function (merchandise) {
                res.status(200).json(merchandise);
            },
            function () {
                res.sendStatus(500);
            }
        )
}

function findAllMerchandisesForSeller(req, res) {
    var sellerId = req.params.sellerId + "";

    merchandiseModel
        .findAllMerchandisesForSeller(sellerId)
        .then(function (merchandises) {
                res.status(200).send(merchandises);

            },
            function () {
                res.sendStatus(500);
            });
}

function findMerchandiseById(req, res) {
    var merchandiseId = req.params.merchandiseId + "";

    merchandiseModel
        .findMerchandiseById(merchandiseId)
        .then(
            function (merchandise) {
                res.status(200).send(merchandise);
            },
            function () {
                res.sendStatus(500);
            }
        )
}

function updateMerchandise(req, res) {
    var merchandiseId = req.params.merchandiseId + "";
    var merchandise = req.body;

    merchandiseModel
        .updateMerchandise(merchandiseId, merchandise)
        .then(
            function (merchandise) {
                res.status(200).send(merchandise);
            },
            function () {
                res.sendStatus(500);
            }
        )

}

function deleteMerchandise(req, res) {
    var merchandiseId = req.params.merchandiseId + "";

    merchandiseModel
        .deleteMerchandise(merchandiseId)
        .then(
            function () {
                res.status(200).send("merchandise delete successfully");
            },
            function () {
                res.sendStatus(500);
            }
        )
}


