var Albums = Backbone.Collection.extend({
  url: '/albums.json',
  model: Album,
});