# Proxy State

A plain proxy implementation to support a state object where you can define properties and actions. The library can be integrated with other libraries such as _React_, but it has no dependencies on them.

```javascript
import proxy from 'proxy-states'

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
import proxy from 'proxy-states'

const p = proxy({
  count: 1,
  inc: (state) => { state.count++ }
}, {
  canSet: (obj, prop, value) => {
    return value < 3
  }
})

p.inc()   // 2
p.inc()   // 2
```

## React

Feel free to use the `proxy-states` as it is. Also you can integrate it to a system that supports a dispatch.

Using _React_ as an example, the library exports a helper `createProxyHook` that takes `useState` from `react` and exports a hook `useProxy` for you. 

```javascript
import { createProxyHook } from 'proxy-states'
import { useState } from 'react'

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