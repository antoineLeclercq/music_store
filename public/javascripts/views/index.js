var IndexView = Backbone.View.extend({
  template: App.templates.index,
  attributes: {
    id: 'index',
  },
  events: {
    'click footer a': 'addAlbum',
  },
  addAlbum: function () {
    this.trigger('addAlbum');
  },
  render: function () {
    this.$el.html(this.template());
    App.$el.html(this.$el);
  },
  initialize: function () {
    this.render();
  },
});