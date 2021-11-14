const proxy = require('./proxy')

test('can get state', () => {
  const p = proxy({ a: 1 })
  expect(p.a).toBe(1)
})

test('can set state', () => {
  const p = proxy({ a: 1 })
  p.a++
  expect(p.a).toBe(2)
})

test('can invoke beforeSet', () => {
  const fn = jest.fn()
  const p = proxy({ a: 1 }, {
    beforeSet: () => { fn() }
  })
  p.a++
  expect(fn.mock.calls.length).toBe(1)
})

test('can invoke beforeSet with current states', () => {
  const fn = jest.fn()
  const p = proxy({ a: 1 }, {
    beforeSet: (v) => { fn(v.a) }
  })
  p.a++
  expect(fn.mock.calls[0][0]).toBe(1)
})

test('can invoke beforeSet with state info', () => {
  const fn = jest.fn()
  const p = proxy({ a: 1 }, {
    beforeSet: (_, prop, value, canSet) => {
      fn(prop, value, canSet)
    }
  })
  p.a++
  expect(fn.mock.calls[0][0]).toBe('a')
  expect(fn.mock.calls[0][1]).toBe(2)
  expect(fn.mock.calls[0][2]).toBe(true)
})

test('can invoke afterSet', () => {
  const fn = jest.fn()
  const p = proxy({ a: 1 }, { 
    afterSet: () => { fn() }
  })
  p.a++
  expect(fn.mock.calls.length).toBe(1)
})

test('can invoke afterSet with new states', () => {
  const fn = jest.fn()
  const p = proxy({ a: 1 }, {
    afterSet: (v) => { fn(v.a) }
  })
  p.a++
  expect(fn.mock.calls[0][0]).toBe(2)
})

test('can invoke afterSet with state info', () => {
  const fn = jest.fn()
  const p = proxy({ a: 1 }, {
    afterSet: (_, prop, value, prev) => { 
      fn(prop, value, prev)
    }
  })
  p.a++
  expect(fn.mock.calls[0][0]).toBe('a')
  expect(fn.mock.calls[0][1]).toBe(2)
  expect(fn.mock.calls[0][2]).toBe(1)
})

test('can invoke canSet', () => {
  const p = proxy({ a: 1 }, { canSet: () => false })
  p.a++
  expect(p.a).toBe(1)
})

test('can invoke canSet to accept states', () => {
  const p = proxy({ a: 1 }, { canSet: (obj, prop, value) => {
    return value < 3
  }})
  p.a++
  expect(p.a).toBe(2)
  p.a++
  expect(p.a).toBe(2)
})

test('can invoke beforeSet with rejected state', () => {
  const fn = jest.fn()
  const p = proxy({ a: 1 }, {
    canSet: (o, p, value) => false,
    beforeSet: (o, p, v, can) => {
      fn(can)
    }
  })
  p.a++
  expect(fn.mock.calls[0][0]).toBe(false)
})

test('can invoke function with this', () => {
  const p = proxy({
    a: 1, 
    inc: function() { this.a++ }
  })
  p.inc()
  expect(p.a).toBe(2)
})

test('can invoke action', () => {
  const p = proxy({
    a: 1,
    inc: m => { m.a++ }
  })
  p.inc()
  expect(p.a).toBe(2)
})

test('can invoke action with a return', () => {
  const p = proxy({
    a: 1,
    read: m => { return m.a }
  })
  expect(p.read()).toBe(1)
})

test('can invoke action with a payload', () => {
  const p = proxy({
    a: 1,
    inc: (m, payload) => { m.a += payload }
  })
  p.inc(9)
  expect(p.a).toBe(10)
})

test('can invoke async action', () => {
  const p = proxy({
    a: 1,
    inc: async function (m) { 
      m.a += 1 
      return m.a
    }
  })
  p.inc().then(res => {
    expect(res).toBe(2)
  })
})