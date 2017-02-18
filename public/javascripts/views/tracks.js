var $overlay = $('#overlay');

var TracksView = Backbone.View.extend({
  tagName: 'article',
  attributes: {
    id: 'tracks_modal',
  },
  events: {
    'click .close': 'close',
  },
  template: Handlebars.compile($('[data-name=tracks]').html()),
  open: function () {
    this.$el.add($overlay).fadeIn(this.duration);
  },
  close: function (e) {
    e.preventDefault();

    this.fadeOut();
    history.back();
  },
  fadeOut: function () {
    this.$el.add($overlay).fadeOut(this.duration, function () {
      this.remove();
    }.bind(this));
  },
  render: function () {
    this.$el.html(this.template({
      album: this.album,
      tracks: this.collection.toJSON(),
    }));
    this.open();
  },
  initialize: function (options) {
    this.album = options.album;
    this.$el.appendTo(document.body);
    this.duration = 500;
  },
});