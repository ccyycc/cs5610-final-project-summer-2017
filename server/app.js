var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var connectionString ='mongodb://localhost/finalProject';

if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
                       process.env.MLAB_PASSWORD + "@ds139322.mlab.com:39322/heroku_3mxxkrfs";
}


mongoose.connect(connectionString);


require('./services/user.service.server');
require('./services/recipe.service.server');

require('./services/association.service.server');

require('./services/map.service.server');
require('./services/merchandise.service.server');
require('./services/store.service.server');

