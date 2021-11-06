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

test('can disable setting property', () => {
  const p = proxy({ a: 1 }, { canSet: () => false })
  p.a++
  expect(p.a).toBe(1)
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

test('can disable all actions', () => {
  const p = proxy({
    a: 1,
    inc: m => { m.a++ }
  }, {
    canSet: () => false
  })
  p.inc()
  expect(p.a).toBe(1)
})

// test('can disable one action', () => {
//   const p = proxy({
//     a: 1,
//     inc: m => { m.a++ },
//     dec: m => { m.a-- }
//   }, {
//     canSet: (obj, prop) => prop === 'inc'
//   })
//   p.inc()
//   expect(p.a).toBe(2)
// })