# Proxy State

A plain proxy implementation to support a state object where you can define properties and actions to change these properties.

```javascript
  const p = proxy({
    count: 1,
    inc: state => {
      state.count++
    }
  })  

  p.inc()
  console.log(p.count)
```
## Develop

```
  yarn install
  yarn test
```