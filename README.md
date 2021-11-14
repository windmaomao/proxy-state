# Proxy States

_Proxy States_ creates an object to hold states and actions. 

## Install

```bash
npm install proxy-states
```

## Quick Start

Say you want to build a counter logic. You can put the `count` variable under an object:

```javascript
import proxy from 'proxy-states'

const p = proxy({
  count: 1
})

p.count 	// 1
```

Now to increment the variable, we can define an action under the same object:

```javascript
const p = proxy({
  count: 1,
  inc: (s, payload) => {
    s.count += payload
  }
})  

p.inc(9)   // 10
```

Notice the `inc` action is a function that takes an input argument, which can be used to read out the `s.count` as well as setting it to a new value.

## Options

We can supply a set of options when defining this object to customize the behavior.

### afterSet

When a state has changed, a `afterSet` callback can be invoked if provided:

```javascript
const p = proxy({
  count: 1
}, {
  afterSet: (obj, prop, value, prev) => {
    // prop = 'a', value = 2, prev = 1
    console.log(obj)
  }
})

p.count++		
```

You can use this callback to monitor the committed state change and perform tasks upon the change.

### canSet

If you want to restrict a change from happening, you can use a `canSet` callback to tell it do so:

```javascript
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

Basically the `canSet` callback is used to accept change requests. For example, if you don't want to commit changes from the same state value, you can compare the new and old state value:

```jsx
  canSet: (obj, prop, value) => obj[prop] !=== value
```

### beforeSet

The  `afterSet` callback is only invoked for the committed changes. In order to monitor all change request, we can use the `beforeSet` callback:

```jsx
const p = proxy({
  count: 1,
  inc: (state) => { state.count++ }
}, {
  beforeSet: (obj, prop, value, canSet) => {
		console.log(canSet)
  }
})

p.inc()
```

Use the `beforeSet` callback can capture all change request regardless whether the change is accepted.

### on change listening

To listen to a property change, we can use a event listener `on`:

```jsx
const p = proxy({
  count: 1,
})

p.on('count', (v) => {
  ...
})

p.count++
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