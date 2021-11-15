const listener = () => {
  const m = {}

  const has = (event) => !!m[event]

  const add = (event, fn) => {
    if (Array.isArray(event)) {
      event.forEach(e => {
        add(e, fn)
      })
      return
    }
    m[event] = m[event] || []
    if (m[event].indexOf(fn) >= 0) return

    m[event].push(fn)
  }

  const invoke = (event, ...rest) => {
    if (!m[event]) return

    m[event].forEach(fn => fn(...rest))
  }

  return {
    has,
    add,
    invoke
  }
}

export default listener