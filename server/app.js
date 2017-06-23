var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/finalProject';

mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

require('./services/user.service.server');
require('./services/recipe.service.server');
require('./services/association.service.server');
