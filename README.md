# Proxy States

_Proxy States_ creates an object to hold states and actions. An action can manipulate the states internally. When a state gets changed, it can notify us with an event. 

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

p.count 	  // count: 1
```

Now to increment the variable, you can do that directly:

```jsx
p.count++   // count: 2
```

Or you can define an action under:

```javascript
const p = proxy({
  count: 1,
  inc: (state, payload) => {
    state.count += payload
  }
})  

p.inc(9)    // count: 10
```

Notice the `inc` action is defined with a function that takes the current `state` as an input argument. 

To listen to a state change, we can subscribe to it with an event listener:

```jsx
const p = proxy({
  count: 1
})

p.on('count', (v, prev) => {
  // v: 2, prev: 1
  console.log(v)
})

p.count++
```

The `on` function listens to any change happened to the `count` state. The callback gives you the current value and the previous value it changes from.

You can also listen to a set of states change instead of a single state:

```jsx
p.on(['count'], (v, prev, prop) => {
	// v: 2, prev: 1, prop: 'count'
})
```

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

Basically the `canSet` callback is used to determine whether a state change request should be accepted. For example, if you don't want to commit changes from the same state value, you can compare the new and old state value and skip if they are same:

```jsx
  canSet: (obj, prop, value) => obj[prop] !=== value
```

### beforeSet

The  `afterSet` callback is only invoked for the accepted changes. In order to monitor all changes including the skipped ones, we can use the `beforeSet` callback:

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

```bash
  yarn install
  yarn test
```