/* global describe, it, require, expect */

var request = require('request');
var root = 'http://localhost:3000/';
var albums;

describe('JSON Routes', function () {
  describe('/albums.json', function () {
    it('returns an object containing array of albums and lastId property', function (done) {
      request(root + 'albums.json', function (error, response, body) {
        albums = JSON.parse(body);
        expect(albums[0].id).toBeDefined();
        expect(albums[0].artist).toBeDefined();
        done();
      });
    });
  });

  // describe('albums/<album>.json', function () {
  //   it('returns an array of tracks', function (done) {
  //     request(root + 'albums/' + albums[0].title + '.json', function (e, res, body) {
  //       expect(JSON.parse(body)[0].title).toBeDefined();
  //       done();
  //     });
  //   });
  // });
});

describe('Add new Album Route', function () {
  var form = {
    title: 'title_test',
    artist: 'artist_test',
    date: '2017-02-18',
    cover: 'http://test.com/cover.png',
    price: '12.99',
  };

  it('returns an object with the album\'s properties', function (done) {
    request.post(root + 'albums', { form: form }, function (error, response, body) {
      var albumData = JSON.parse(body);

      expect(typeof albumData.id).toBe('number');
      expect(albumData.artist).toBe(form.artist);
      expect(albumData.price).toBe(form.price);
      done();
    });
  });
});