/* globals tracksScaffold, describe, beforeEach, it, expect */
jQuery.fx.off = true;

describe('Tracks View', function () {
  var album = albumsScaffold.findWhere({ title: '1989' });

  beforeEach(function () {
    this.view = new TracksView({
      album: album,
      collection: tracksScaffold,
    });
  });

  afterEach(function () {
    this.view.remove();
  });

  it('has a collection property assigned', function () {
    expect(this.view.collection).toBeDefined();
    expect(this.view.collection.length).toEqual(tracksScaffold.length);
  });

  it('has a Handlebars template compiled', function () {
    expect(this.view.template).toBeDefined();
  });

  it('renders a modal to the body when render is called', function () {
    this.view.render();
    expect($('#tracks_modal li').length).toEqual(tracksScaffold.length);
  });

  it('removes the view when fadeOut called', function () {
    this.view.fadeOut();
    expect($('#tracks_modal').length).toEqual(0);
  });
});