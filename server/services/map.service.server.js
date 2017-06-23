// https://developer.oxforddictionaries.com/documentation

var q = require('q');
var app = require('../../express');
var https = require('https');

app.post('/api/map/searchWithCoords', searchWithCoords);
app.get('/api/map/searchWithAddress/:currentAddress', searchWithAddress);


var radius = 500;
var type = 'food';
var keyword = 'supermarket';


var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=LATITUDE,LONGITUDE&radius=RADIUS&type=TYPE&keyword=KEYWORD&key=GOOGLE_KEY";
var pathBase = "/maps/api/place/nearbysearch/json?location=LATITUDE,LONGITUDE&radius=RADIUS&type=TYPE&keyword=KEYWORD&key=GOOGLE_API_KEY";

var locationPathBase= "/maps/api/place/textsearch/json?query=ADDRESS&key=GOOGLE_API_KEY";

function searchWithCoords(req, res) {
    var coords =req.body;
    searchNearBy(coords)
        .then(function (response) {
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}




function searchWithAddress(req, res) {
    var address = req.params.currentAddress;
    searchCoordsOnGoogle(address)
        .then(function (response) {
            if(response.results && response.results.length>0) {
                req.body.latitude = response.results[0].geometry.location.lat;
                req.body.longitude = response.results[0].geometry.location.lng;
                searchWithCoords(req,res);
                 // res.json(response.results[0].geometry.location);
            }else{
                res.sendStatus(404);
            }
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function searchCoordsOnGoogle(address) {

    var deferred = q.defer();
    https.get({
        host: 'maps.googleapis.com',
        path: locationPathBase
            .replace("ADDRESS", address)
            .replace("GOOGLE_API_KEY",process.env.GOOGLE_API_KEY),
        headers: {
            "Accept": "application/json"
        }
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch (e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}

function searchNearBy(coords) {

    var deferred = q.defer();
    https.get({
        host: 'maps.googleapis.com',
        path: pathBase
            .replace("LATITUDE", coords.latitude)
            .replace("LONGITUDE", coords.longitude)
            .replace("RADIUS",radius)
            .replace("TYPE",type)
            .replace("KEYWORD",keyword)
            .replace("GOOGLE_API_KEY",process.env.GOOGLE_API_KEY),
        headers: {
            "Accept": "application/json"
        }
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch (e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}