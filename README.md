![use-redux-state logo](/logo.png?raw=true 'Optional Title')

![version](https://badge.fury.io/gh/isakkeyten%2Fuse-redux-state.svg) ![size](https://badgen.net/bundlephobia/minzip/usereduxstate) ![treeshakable](https://badgen.net/bundlephobia/tree-shaking/usereduxstate) ![last commit](https://badgen.net/github/last-commit/isakkeyten/use-redux-state) ![license](https://badgen.net/github/license/isakkeyten/use-redux-state) ![open issues](https://badgen.net/github/open-issues/isakkeyten/use-redux-state)

# use-redux-state

Use redux with a hook, similar to useState.
Comes with async handling support.

## Important ⚠️

```
The npm package name is currently 'usereduxstate' (no hyphens)
This is probably bound to change, i.e. the package will be scoped.
```

## Installation ⚙️

```bash
npm install usereduxstate --save
```

## How to use

#### 1. Create a reducer and add the async middleware

```js
import { createStore, applyMiddleware } from 'redux';
import { createReducer, asyncMiddleware } from 'usereduxstate';

const initialState = {
  count: 0,
  user: {},
};

const reducer = createReducer(initialState);

const store = createStore(reducer, applyMiddleware(asyncMiddleware));

export default store;
```

#### 2. Wrap your app with the store just as you would

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement,
);
```

#### 3. Just use it! 🎉

```js
import React from 'react';
import { useRedux, useAsync } from 'usereduxstate';

const fetchUserAction = async ({ payload, get, set }) => {
  try {
    set('loading.fetchUser', true);
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    set('loading.fetchUser', false);
    set('user', data);
  } catch (err) {
    set('loading.fetchUser', false);
    set('error.fetchUser', true);
  }
};

export default function App() {
  const [count, setCount] = useRedux('count');
  const [user] = useRedux('user');
  const [userLoading] = useRedux('loading.fetchUser');
  const fetchUser = useAsync({
    type: 'fetchUser',
    effect: fetchUserAction,
  });
  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <br />
      <button onClick={fetchUser}>{userLoading ? 'loading' : 'get user'}</button>
      <br />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
```

---

# API

### createReducer

```js
const initialState = {
  // state object
};
const reducer = createReducer(initialState);
// returns a regular reducer, can be combined
```

### useRedux

```js
// uses lodash.get so go wild
const [value, setValue] = useRedux('some.deeply.nested[0].path');
// returns store value and a setter function (already wrapped with dispatch)
```

### useAsync

```js
const action = useAsync({
  type: 'string name', // <- mainly to show in redux devtools
  effect: async ({ payload, set, get }) => {
    // callback function
    // payload - your passed value at execution
    // set - set('any.nested.path', value) - sets value to store
    // get - cosnt value = get('any.nested.path) - returns store value
  },
});
```

### useReduxValue

```js
const value = useReduxValue('path');
// similar to useRedux except it's only the value, no setter
```

### useReduxSetter

```js
const value = useReduxSetter('path');
// similar to useRedux except it's only the setter func, no value
```
