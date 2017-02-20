var NewAlbumView = Backbone.View.extend({
  template: App.templates.new_album,
  attributes: {
    id: 'new_album',
  },
  render: function () {
    this.$el.html(this.template());
    App.$el.html(this.$el);
  },
  events: {
    'submit form': 'createAlbum',
  },
  createAlbum: function (e) {
    e.preventDefault();
    var $form = $(e.target);

    $.ajax({
      url: $form.attr('action'),
      method: $form.attr('method'),
      data: $form.serialize(),
      success: function (json) {
        App.albums.add(json);
        App.indexView();
        router.navigate('/', { trigger: true });
      },
    });
  },
  initialize: function () {
    this.render();
  },
});