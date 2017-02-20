var AlbumView = Backbone.View.extend({
  tagName: 'article',
  template: App.templates.album,
  events: {
    'click a.btn': 'addToCart'
  },
  render: function () {
    this.$el.attr('data-id', this.model.get('id'));
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo($('#albums'));
  },
  addToCart: function (e) {
    e.preventDefault();
    App.trigger('add_to_cart', this.model);
  },
  initialize: function () {
    this.render();
  },
});