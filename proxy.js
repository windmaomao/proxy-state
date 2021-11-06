const handler = {
  get: function () {
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