import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

let middleware = applyMiddleware(thunk, createLogger());

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middleware = compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}

const store = createStore(
  reducers,
  middleware,
);

export default store;