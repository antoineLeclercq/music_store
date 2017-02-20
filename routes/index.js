var path = require('path');
var Albums = require(path.resolve(path.dirname(__dirname), 'node_modules/albums_manipulation.js'));

module.exports = function (router) {
  router.get('/', function(req, res) {
    res.render('index', {
      albums: Albums.get(),
    });
  });

  router.get('/albums.json', function (req, res) {
    res.send(Albums.get());
  });
};