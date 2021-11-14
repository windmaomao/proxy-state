const handler = ops => ({
  get: function (target, prop, receiver) {
    const value = Reflect.get(...arguments)
    if (typeof value === 'function') {
      return function () { 
        return value.apply(receiver, [
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
    ops.beforeSet && ops.beforeSet(obj, prop, value, canSet)

    let prev
    if (canSet) {
      prev = obj[prop]
      obj[prop] = value
    }
    ops.afterSet && ops.afterSet(obj, prop, value, prev)

    return true
  }
})

function proxy(obj, options) {
  options = options || {}
  return new Proxy(obj, handler(options))
}

module.exports = proxy