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
  const [, dispatch] = useState(initialObj)

  const [obj] = useState(proxy(initialObj, {
    canSet: (obj, prop, value) => {
      if (obj[prop] !== value) {
        dispatch({ ...obj, [prop]: value })
        return true
      }
      return false
    }
  }))

  return obj
}
```


## Develop

```
  yarn install
  yarn test
```