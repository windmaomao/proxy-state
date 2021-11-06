# Proxy State

A plain proxy implementation to support a state object where you can define properties and actions.

```javascript
  const p = proxy({
    count: 1,
    inc: (state, payload) => {
      state.count += 2
    }
  })  

  p.inc(9)   // 10
```

You can actually use the option `canSet` to decide if a property can be set:

```javascript
  const p = proxy({
    count: 1,
    inc: (state) => { state.count++ },
    canSet: (obj, prop, value) => {
      return value < 3
    }
  })

  p.inc()   // 2
  p.inc()   // 2
```

## Integration

You can integrate the proxy to a system that supports a dispatch.

Using _React_ as an example, if a change is detected, `dispatch` is invoked along with setting the new value:

```javascript
const useProxy = (initialObj) => {
  const [, dispatch] = useState(0)

  const [p] = useState(proxy(initialObj, {
    canSet: (obj, prop, value) => obj[prop] !== value,
    afterSet: () => { dispatch(v => v + 1) }
  }))

  return p
}

const counter = {
  count: 1,
  inc: (state) => { state.count++ },  
}

function App() {
  const m = useProxy(counter)  
  
  return <div>{m.count}</div>
}
```


## Develop

```
  yarn install
  yarn test
```