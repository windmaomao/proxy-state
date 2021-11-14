import proxy from './proxy'

const createProxyHook = useState => (initialObj) => {
  const [, dispatch] = useState(0)
  const [p] = useState(proxy(initialObj, {
    canSet: (obj, prop, value) => obj[prop] !== value,
    afterSet: () => { dispatch(v => v + 1) }
  }))

  return p
}

export default createProxyHook