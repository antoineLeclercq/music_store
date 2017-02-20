var CartItems = Backbone.Collection.extend({
  addItem: function (item) {
    var cartItem = this.get(item.get('id'));

    if (cartItem) {
      cartItem.set('quantity', cartItem.get('quantity') + 1);
    } else {
      cartItem = item.clone();
      cartItem.set('quantity', 1);
      this.add(cartItem);
    }

    this.update();
    this.trigger('cart_updated');
    this.updateStorage();
  },
  setTotal: function () {
    this.total = this.toJSON().reduce(function (result, album) {
      return result + album.price * album.quantity;
    }, 0).toFixed(2);

    return this;
  },
  setQuantity: function () {
    this.quantity = this.toJSON().reduce(function (result, album) {
      return result + album.quantity;
    }, 0);

    return this;
  },
  destroy: function (id) {
    this.remove(id);
    this.update();
    this.trigger('cart_updated');
    this.updateStorage();
  },
  readStorage: function () {
    var storedCart = JSON.parse(localStorage.getItem('cartItems'));
    this.reset(storedCart);
    this.update();
  },
  updateStorage: function () {
    localStorage.setItem('cartItems', JSON.stringify(this.toJSON()));
  },
  update: function () {
    this.setQuantity().setTotal();
  },
  initialize: function () {
    this.listenTo(App, 'add_to_cart', this.addItem);
    this.on('destroy', this.destroy);
    this.readStorage();
  },
});