/* global describe, it, expect, App */

describe('Tracks Collection', function () {
  var album = '1989';

  beforeEach(function () {
    this.tracks = new (Tracks.extend({ url: '/albums/' + album + '.json' }))();
  });

  it('fetches tracks with title and length', function (done) {
    this.tracks.fetch({
      success: function () {
        expect(this.tracks.toJSON().length).toBeGreaterThan(0);
        expect(typeof this.tracks.first().toJSON().title).toBe('string');
        expect(typeof this.tracks.first().toJSON().length).toBe('string');
        done();
      }.bind(this),
    });
  });
});