var Album = Backbone.Model.extend({
  initialize: function () {
    this.set('price', Number(this.get('price')));
  },
});