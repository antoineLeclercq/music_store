var Album = Backbone.Model.extend({
  parse: function (attrs) {
    attrs.tracksUrl = '/albums/' + attrs.title;
    return attrs;
  },
});