import listener from './listener'

test('can add a listener on a state', () => {
  const p = listener()
  p.add('m', () => {})
  expect(p.has('m')).toBe(true)
})

test('can invoke a listener upon a state change', () => {
  const fn = jest.fn()
  const p = listener()
  p.add('m', () => { fn() })
  p.invoke('m')
  expect(fn.mock.calls.length).toBe(1)
  p.invoke('n')
  expect(fn.mock.calls.length).toBe(1)
})

test('can invoke all listenersupon a state change', () => {
  const fn = jest.fn()
  const p = listener()
  p.add('m', () => { fn() })
  p.add('m', () => { fn() })
  p.invoke('m')
  expect(fn.mock.calls.length).toBe(2)
  p.invoke('n')
  expect(fn.mock.calls.length).toBe(2)
})

test('can add a listener on a set of states', () => {
  const p = listener()
  p.add(['m', 'n'], () => { })
  expect(p.has('m')).toBe(true)
})

