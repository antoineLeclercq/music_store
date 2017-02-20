var path = require('path');
var Albums = require(path.resolve(path.dirname(__dirname), 'node_modules/albums_manipulation.js'));
var _ = require('underscore');

module.exports = function (router) {
  router.get('/albums/new', function (req, res) {
    res.render('new', {
      albums: Albums.get(),
    });
  });

  router.post('/albums', function (req, res) {
    var album = req.body;
    var albums = Albums.get();

    album.id = Albums.getLastId() + 1;
    albums.push(album);

    Albums.set(albums, album.id);

    res.json(album);
  });

  router.put('/albums/:id/update', function (req, res) {
    var id = Number(req.params.id);
    var data = req.body;
    var albums = Albums.get();
    var album = _.findWhere(albums, { id: id });

    console.log(data, album);

    _.extend(album, data);
    Albums.set(albums);

    res.json(album);
  });

  router.delete('/albums/:id/delete', function (req, res) {
    var id = Number(req.params.id);
    var albums = _.select(Albums.get(), function (album) {
      return album.id !== id;
    });
    console.log(req.params, albums);

    Albums.set(albums);

    res.status(200).end();
  });
};