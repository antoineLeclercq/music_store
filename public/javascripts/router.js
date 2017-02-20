var router = new (Backbone.Router.extend({
  routes: {
    'albums/new': App.newAlbum,
  },
  index: function () {
    App.indexView();
  },
  initialize: function () {
    this.route(/^\/?$/, 'index', this.index);
  },
}))();

Backbone.history.start({
  pushState: true,
});

$(document).on('click', 'a[href^="/"]', function (e) {
  e.preventDefault();
    console.log('no');

  router.navigate($(e.target).attr('href').replace(/^\//, ''), { trigger: true });
});