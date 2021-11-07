const proxy = require('./proxy')

test('can get property', () => {
  const p = proxy({ a: 1 })
  expect(p.a).toBe(1)
})

test('can set property', () => {
  const p = proxy({ a: 1 })
  p.a++
  expect(p.a).toBe(2)
})

test('can invoke after set property', () => {
  const fn = jest.fn()
  const p = proxy({ a: 1 }, { 
    afterSet: () => { fn() }
  })
  p.a++
  expect(fn.mock.calls.length).toBe(1)
})

test('can disable setting property', () => {
  const p = proxy({ a: 1 }, { canSet: () => false })
  p.a++
  expect(p.a).toBe(1)
})

test('can disable based on conditions', () => {
  const p = proxy({ a: 1 }, { canSet: (obj, prop, value) => {
    return value < 3
  }})
  p.a++
  expect(p.a).toBe(2)
  p.a++
  expect(p.a).toBe(2)
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

test('can disable action', () => {
  const p = proxy({
    a: 1,
    inc: m => { m.a++ }
  }, {
    canSet: () => false
  })
  p.inc()
  expect(p.a).toBe(1)
})

test('can invoke action with payload', () => {
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