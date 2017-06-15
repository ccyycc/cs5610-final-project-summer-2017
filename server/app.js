var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/finalProject';

mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

