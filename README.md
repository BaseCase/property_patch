# PropertyPatch

This is basically just a slightly smoother way to add getters/setters to a JS class. It's a thin wrapper over the top of `Object.defineProperty` that just makes a little more sense to my brain.


## Forms

It's available in two forms.


### function form

One form is just a function that you require and then `.call` in your constructor:

```javascript
var add_property = require('property_patch').add_property;

function Foo() {
  add_property.call(this, 'bar');
}

var f = new Foo();
f.bar = 5;
f.bar; // === 5
```

### Object patch form

You can also patch it into `Object.prototype` if you're feeling dirty. I prefer this form, but I know it's frowned upon, so that's why you have options.

```javascript
require('property_patch').patch();

function Foo() {
  this.add_property('bar');
}

var f = new Foo();
f.bar = 5;
f.bar; // === 5
```


## BUT WHY?!

Why would I want this? Well, if you're writing OO code, then *everything* should really be a method call, never a direct property access. However, it is super lame to have to define and call explicit `get_foo` and `set_foo` methods on every class. Using properties defined this way allows you to have real getters and setters without the fuss.

Contrived example time!

### Class definition using `add_property`

```javascript
function Foo() {
  this.add_property('bar');
}

Foo.prototype.get_bar = function() {
  return this._bar + 5;
}

Foo.prototype.set_bar = function(val) {
  if (typeof(val) !== 'number') throw "ONLY NUMBERS PLZ";
  this._bar = val;
}
```

So notice the custom `get_bar` and `set_bar` methods. Because we defined the property 'bar' in the constructor, we can say stuff like this:

```javascript
var f = new Foo();
f.bar = 5;
f.bar; // === 10 (whoa!)
f.bar = "hey"; // not allowed! throws an error!
```

Pretty neat, huh? Oh... Well, I thought it was cool. Don't be so negative all the time.

