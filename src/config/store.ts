import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer, { IRootState } from '../shared/reducers';
import DevTools from './devtools';

const defaultMiddlewares = [thunkMiddleware];

const composedMiddlewares = middlewares =>
  process.env.NODE_ENV === 'development'
    ? compose(
        applyMiddleware(...defaultMiddlewares, ...middlewares),
        DevTools.instrument()
      )
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState, middlewares = []) => createStore(rootReducer, initialState, composedMiddlewares(middlewares));

export default initialize;
