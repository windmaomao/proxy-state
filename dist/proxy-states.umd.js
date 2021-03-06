(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ProxyStates = {}));
})(this, (function (exports) { 'use strict';

  var listener = () => {
    var m = {};

    var has = event => !!m[event];

    var add = (event, fn) => {
      if (Array.isArray(event)) {
        event.forEach(e => {
          add(e, fn);
        });
        return;
      }

      m[event] = m[event] || [];
      if (m[event].indexOf(fn) >= 0) return;
      m[event].push(fn);
    };

    var invoke = function invoke(event) {
      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      if (!m[event]) return;
      m[event].forEach(fn => fn(...rest));
    };

    return {
      has,
      add,
      invoke
    };
  };

  var handler = (ops, events) => ({
    get: function get(target, prop, receiver) {
      var value = Reflect.get(...arguments);

      if (prop === 'on') {
        return function (event, fn) {
          events.add(event, fn);
        };
      }

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

      ops.beforeSet && ops.beforeSet(obj, prop, value, canSet);
      var prev;

      if (canSet) {
        prev = obj[prop];
        obj[prop] = value;
      }

      ops.afterSet && ops.afterSet(obj, prop, value, prev);
      events.has(prop) && events.invoke(prop, value, prev, prop);
      return true;
    }
  });

  function proxy(obj, options) {
    options = options || {};
    var events = listener();
    return new Proxy(obj, handler(options, events));
  }

  var createProxyHook = useState => initialObj => {
    var [, dispatch] = useState(0);
    var [p] = useState(proxy(initialObj, {
      canSet: (obj, prop, value) => obj[prop] !== value,
      afterSet: () => {
        dispatch(v => v + 1);
      }
    }));
    return p;
  };

  exports.createProxyHook = createProxyHook;
  exports["default"] = proxy;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
