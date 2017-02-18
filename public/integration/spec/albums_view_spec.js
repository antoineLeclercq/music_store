/* global describe, it, expect, beforeEach, AlbumsView */

describe('Albums View', function () {
  beforeEach(function () {
    this.view = new AlbumsView({
      collection: albumsScaffold,
    });
  });

  it('has a collection property assigned', function () {
    expect(this.view.collection).toBeDefined();
    expect(this.view.collection.models.length).toEqual(albumsScaffold.length);
  });

  it('has a Handlebars template compiled', function () {
      expect(typeof this.view.template).toBe('function');
  });

  it('renders to an #albums container when render is called', function () {
    this.view.render();
    expect($('#albums article').length).toEqual(albumsScaffold.length);
  });

  it('re-renders the view when the collection changes', function () {
    var originalHtml;
    var newHtml;
    var model = albumsScaffold.findWhere({ artist: 'Tori Kelly' });

    this.view.render();
    originalHtml = $('#albums').html();
    model.set('title', 'test');
    newHtml = $('#albums').html();
    expect(originalHtml).not.toEqual(newHtml);
  });
});