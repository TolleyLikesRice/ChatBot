require('fs').readdirSync('./mongodb/models').forEach(function(file) {
  require('../mongodb/models/' + file);
});
require('fs').readdirSync('./mongodb/controllers').forEach(function(file) {
  require('../mongodb/controllers/' + file);
});