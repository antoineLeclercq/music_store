/* globals AlbumsView, Albums, Tracks, TracksView */

var App = {
  init: function () {
    this.fetchAlbums();
  },
  albumsLoaded: function () {
    this.view = new AlbumsView({
      collection: this.albums,
    });
    this.view.render();
  },
  fetchAlbums: function () {
    this.albums = new Albums();
    this.albums.fetch({
      success: function () {
        this.albumsLoaded();
      }.bind(this),
    });
  },
  tracksLoaded: function () {
    this.tracksView = new TracksView({
      album: this.selectedAlbum.toJSON(),
      collection: this.tracks,
    });
    this.tracksView.render();
  },
  fetchTracks: function (name) {
    this.selectedAlbum = this.albums.findWhere({ title: name });
    this.tracks = new (Tracks.extend({
      url: this.selectedAlbum.get('tracksUrl') + '.json',
    }))();
    this.tracks.fetch({
      success: function () {
        this.tracksLoaded();
      }.bind(this),
    });
  },
};

var Router = Backbone.Router.extend({
  routes: {
    'albums/:name': 'getAlbum',
  },
  getAlbum: function (name) {
    App.fetchTracks(name);
  },
  index: function () {
    if (!App.tracksView.$el.is(':animated')) {
      App.tracksView.fadeOut();
    }
  },
  initialize: function () {
    this.route(/^\/?$/, 'index');
  },
});

var router = new Router();

Backbone.history.start({
  pushState: true,
  silent: true,
});

$(document).on('click', 'a[href^="/"]', function (e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr('href').replace(/^\//, ''), { trigger: true });
});

App.init();