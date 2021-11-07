# Proxy State

A plain proxy implementation to support a state object where you can define properties and actions.

```javascript
const proxy = require('proxy-states')

const p = proxy({
  count: 1,
  inc: (state, payload) => {
    state.count += payload
  }
})  

p.inc(9)   // 10
```

You can actually use the option `canSet` to decide if a property can be set:

```javascript
const proxy = require('proxy-states')

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

Using _React_ as an example, it creates a hook via `createProxyHook`, which takes `useState` from `react`.

```javascript
const { createProxyHook } = require('proxy-states')
const { useState } = require('react')

const useProxy = createProxyHook(useState)
```

With the `useProxy` hook, we can apply it to the `App` component with `counter` state.

```javascript
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