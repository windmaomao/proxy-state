(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ProxyStates = {}));
})(this, (function (exports) { 'use strict';

  var handler = ops => ({
    get: function get(target, prop, receiver) {
      var value = Reflect.get(...arguments);

      if (typeof value === 'function') {
        return function () {
          return value.apply(receiver, [receiver, ...arguments]);
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

      ops.afterSet && ops.afterSet(obj);
      return true;
    }
  });

  function proxy(obj, options) {
    options = options || {};
    return new Proxy(obj, handler(options));
  }

  var proxy_1 = proxy;

  var createProxyHook$1 = useState => initialObj => {
    var [, dispatch] = useState(0);
    var [p] = useState(proxy_1(initialObj, {
      canSet: (obj, prop, value) => obj[prop] !== value,
      afterSet: () => {
        dispatch(v => v + 1);
      }
    }));
    return p;
  };

  var createProxyHook_1 = createProxyHook$1;

  var main = proxy_1;
  var createProxyHook = createProxyHook_1;
  main.createProxyHook = createProxyHook;

  exports.createProxyHook = createProxyHook;
  exports["default"] = main;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
