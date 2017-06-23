var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/finalProject');

require('./services/user.service.server');
require('./services/recipe.service.server');
require('./services/map.service.server');
require('./services/merchandise.service.server');
require('./services/store.service.server');
require('./services/comment.service.server');
