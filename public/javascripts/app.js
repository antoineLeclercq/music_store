var App = {
  $el: $('main'),
  templates: JST,
  renderAlbums: function () {
    this.albums.each(this.renderAlbumView.bind(this));
  },
  renderAlbumView: function (model) {
    new AlbumView({
      model: model,
    });
  },
  createCart: function () {
    this.cart = new CartItems();
    this.cart.view = new CartView({ collection: this.cart });
  },
  indexView: function () {
    this.index = new IndexView();
    this.renderAlbums();
    this.bindEvents();
  },
  newAlbum: function () {
    new NewAlbumView();
  },
  bindEvents: function () {
    _.extend(this, Backbone.Events);
    this.listenTo(this.index, 'addAlbum', this.newAlbum);
  },
};

Handlebars.registerHelper('format_price', function (price) {
  return Number(price).toFixed(2);
});