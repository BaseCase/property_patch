function add_property(prop_name, default_value) {
  var getter = this['get_' + prop_name] || default_getter(prop_name);
  var setter = this['set_' + prop_name] || default_setter(prop_name);

  Object.defineProperty(this, prop_name, {
    get: getter.bind(this),
    set: setter.bind(this)
  });

  this['_' + prop_name] = default_value;
}


function default_getter(prop_name) {
  return function() {
    return this['_' + prop_name];
  }
}


function default_setter(prop_name) {
  return function(val) {
    this['_' + prop_name] = val;
  }
}


exports.add_property = add_property;
exports.patch = function() {
  Object.prototype.add_property = add_property;
}

