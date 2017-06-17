// https://developer.oxforddictionaries.com/documentation

var q = require('q');
const app = require('../../express');
const https = require('https');

app.post('/api/map', searchQuery);

var latitude = -33.8670522;
var longitude = 151.1957362;
var radius = 500;
var type = 'food';
var keyword = 'supermarket';


var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=LATITUDE,LONGITUDE&radius=RADIUS&type=TYPE&keyword=KEYWORD&key=GOOGLE_KEY";
var pathBase = "/maps/api/place/nearbysearch/json?location=LATITUDE,LONGITUDE&radius=RADIUS&type=TYPE&keyword=KEYWORD&key=GOOGLE_API_KEY";


function searchQuery(req, res) {
    var coords =req.body;
    console.log(coords);
    searchNearBy(coords)
        .then(function (response) {
            console.log(response)
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
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