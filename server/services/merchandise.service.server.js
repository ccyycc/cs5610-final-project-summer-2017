var app = require('../../express');
var multer = require('multer');
var upload = multer({dest: __dirname + '/../../public/uploads/merchandise/picture'});

var merchandiseModel = require('../models/merchandise/merchandise.model.server');

app.post('/api/store/:storeId/merchandise', createMerchandise);
app.get('/api/store/:storeId/merchandise', findAllMerchandisesForStore);
app.get('/api/merchandise/:merchandiseId', findMerchandiseById);
app.put('/api/merchandise/:merchandiseId', updateMerchandise);
app.delete('/api/merchandise/:merchandiseId', deleteMerchandise);

// app.post('/api/upload/merchandise/picture', upload.single('myFile'), uploadImage);




function createMerchandise(req, res) {
    var merchandise = req.body;
    var storeId = req.params.storeId;
    merchandiseModel
        .createMerchandise(storeId, merchandise)
        .then(function (merchandise) {
                res.status(200).json(merchandise);
            },
            function () {
                res.sendStatus(500);
            }
        )
}

function findAllMerchandisesForStore(req, res) {
    var storeId = req.params.storeId + "";

    merchandiseModel
        .findAllMerchandisesForStore(storeId)
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


