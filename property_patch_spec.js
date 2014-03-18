var expect = require('chai').expect;

require('./property_patch').patch();


describe("add_property", function() {
  beforeEach(function() {
    this.Foo = function() {
      this.add_property('bar');
    }
  });


  it("makes it much cleaner to add computed properties to a JS class", function() {
    this.Foo.prototype.get_bar = function() {
      return 'the value is ' + this._bar;
    }

    this.Foo.prototype.set_bar = function(val) {
      this._bar = val > 10 ? 10 : val;
    }

    var f = new this.Foo();
    f.bar = 5;
    expect(f.bar).to.equal('the value is 5');
    f.bar = 20;
    expect(f.bar).to.equal('the value is 10');
  });


  it("provides default getter and setter behavior if you don't supply your own", function() {
    var f = new this.Foo();
    f.bar = 5;
    expect(f.bar).to.equal(5);
  });


  it("accepts an optional default value for a property", function() {
    function Bar() {
      this.add_property('hey', 3);
    }

    var b = new Bar();
    expect(b.hey).to.equal(3);
  });


  it("is also available as a function you can .call", function() {
    var add_property = require('./property_patch').add_property;
    function Hi() {
      add_property.call(this, 'what', 100);
    }

    var h = new Hi();
    expect(h.what).to.equal(100);
  });
});

