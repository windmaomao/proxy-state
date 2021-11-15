import listener from './listener'

const handler = (ops, events) => ({
  get: function (target, prop, receiver) {
    const value = Reflect.get(...arguments)

    if (prop === 'on') {
      return function (event, fn) {
        events.add(event, fn)
      }
    }
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
    events.has(prop) && events.invoke(prop, value, prev, prop)

    return true
  }
})

function proxy(obj, options) {
  options = options || {}
  const events = listener()
  return new Proxy(obj, handler(options, events))
}

export default proxy