var CartView = Backbone.View.extend({
  el: $('#cart').get(0),
  template: App.templates.cart,
  events: {
    'click a': 'destroy',
  },
  destroy: function (e) {
    e.preventDefault();
    var modelId = Number($(e.target).closest('li').attr('data-id'));
    this.collection.trigger('destroy', modelId);
  },
  render: function () {
    App.cart.items = this.collection.toJSON();
    this.$el.html(this.template(App.cart));
  },
  initialize: function () {
    this.render();
    this.listenTo(this.collection, 'cart_updated', this.render);
  }
});