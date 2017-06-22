var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/finalProject';

mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

require('./services/map.service.server');
require('./services/merchandise.service.server');
require('./services/user.service.server');
require('./services/store.service.server');