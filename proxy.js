const handler = {
  get: function (target, prop, receiver) {
    const value = Reflect.get(...arguments)
    if (typeof value === 'function') {
      return () => { value.call(target, target) }
    }
    return Reflect.get(...arguments)
  },
  set: function (obj, prop, value) {
    obj[prop] = value
    return true
  }
}

function proxy(obj) {
  return new Proxy(obj, handler)
}

module.exports = proxy