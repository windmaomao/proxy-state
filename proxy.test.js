const proxy = require('./proxy')

test('can read property', () => {
  const p = proxy({ a: 1 })
  expect(p.a).toBe(1)
})

test('can write property', () => {
  const p = proxy({ a: 1 })
  p.a++
  expect(p.a).toBe(2)
})

test('can invoke function changing property', () => {
  const p = proxy({
    a: 1, 
    inc: function() {
      this.a++
    }
  })
  p.inc()
  expect(p.a).toBe(2)
})

test('can invoke action changing property', () => {
  const p = proxy({
    a: 1,
    inc: function (m) {
      m.a++
    }
  })
  p.inc()
  expect(p.a).toBe(2)
})