(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  var handler = function handler(ops) {
    return {
      get: function get(target, prop, receiver) {
        var value = Reflect.get.apply(Reflect, arguments);

        if (typeof value === 'function') {
          return function () {
            value.apply(receiver, [receiver].concat(Array.prototype.slice.call(arguments)));
          };
        }

        return value;
      },
      set: function set(obj, prop, value) {
        var canSet = true;

        if (ops.canSet) {
          canSet = ops.canSet(obj, prop, value);
        }

        if (canSet) {
          obj[prop] = value;
        }

        return true;
      }
    };
  };

  function proxy(obj, options) {
    options = options || {};
    return new Proxy(obj, handler(options));
  }

  module.exports = proxy;

}));
