const handler = ops => ({
  get: function (target, prop, receiver) {
    const value = Reflect.get(...arguments)
    if (typeof value === 'function') {
      return function () { 
        value.apply(receiver, [
          receiver, ...arguments
        ]) 
      }
    }
    return value
  },
  set: function (obj, prop, value) {
    let canSet = true
    if (ops.canSet) {
      canSet = ops.canSet(obj, prop, value)
    }
    if (canSet) {
      obj[prop] = value
    }

    return true
  }
})

function proxy(obj, options) {
  options = options || {}
  return new Proxy(obj, handler(options))
}

module.exports = proxy