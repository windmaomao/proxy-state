(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  var handler = {
    get: function get(target, prop, receiver) {
      var value = Reflect.get.apply(Reflect, arguments);

      if (typeof value === 'function') {
        return function () {
          value.call(target, target);
        };
      }

      return value;
    },
    set: function set(obj, prop, value) {
      obj[prop] = value;
      return true;
    }
  };

  function proxy(obj) {
    return new Proxy(obj, handler);
  }

  module.exports = proxy;

}));
