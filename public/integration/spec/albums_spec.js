/* global describe, it, expect, App */

describe('Albums Collection', function () {
  it('fetches a collection of three albums', function (done) {
    var albumsLoaded = App.albumsLoaded;
    App.albumsLoaded = function () {
      albumsLoaded.apply(App, arguments);
      expect(App.albums.models.length).toBe(3);
      expect(typeof App.albums.first().get('title')).toBe('string');
      done();
    };

    App.init();
  });

  it('sets a tracksUrl property when models are created', function (done) {
    App.albumsLoaded = function () {
      expect(App.albums.first().get('tracksUrl')).toMatch(/\/album/);
      done();
    };

    App.init();
  });
});