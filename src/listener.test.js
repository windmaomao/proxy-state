import listener from './listener'

test('can add an event', () => {
  const p = listener()
  p.add('m', () => {})
  expect(p.has('m')).toBe(true)
})

test('can invoke an event', () => {
  const fn = jest.fn()
  const p = listener()
  p.add('m', () => { fn() })
  p.invoke('m')
  expect(fn.mock.calls.length).toBe(1)
  p.invoke('n')
  expect(fn.mock.calls.length).toBe(1)
})

test('can invoke multiple events', () => {
  const fn = jest.fn()
  const p = listener()
  p.add('m', () => { fn() })
  p.add('m', () => { fn() })
  p.invoke('m')
  expect(fn.mock.calls.length).toBe(2)
  p.invoke('n')
  expect(fn.mock.calls.length).toBe(2)
})

