import { useSelector, useDispatch } from 'react-redux';
import set from 'lodash.set';
import get from 'lodash.get';

export const asyncMiddleware = (store) => (next) => async (action) => {
  const result = next(action);
  const async = get(action, 'meta.async');
  if (async) {
    const { dispatch, getState } = store;
    await async({
      payload: action.payload,
      set: (path, payload, name) => {
        const type = name || `SET[${path}]`;
        dispatch({ type, payload, meta: { path } });
      },
      get: (path) => {
        const state = getState();
        return get(state, path);
      },
    });
  }
  return result;
};

export const createReducer = (initialState) => (state = initialState, action) => {
  const path = get(action, 'meta.path');
  if (!path) return state;
  return set(state, path, action.payload);
};

export const useRedux = (path, name) => {
  const value = useSelector((state) => get(state, path));
  const dispatch = useDispatch();
  const type = name || `SET[${path}]`;
  const action = (payload) => dispatch({ type, payload, meta: { path } });
  return [value, action];
};

export const useAsync = ({ type, effect }) => {
  const dispatch = useDispatch();
  return (payload) => dispatch({ type, payload, meta: { async: effect } });
};

export const useReduxValue = (path) => {
  const value = useSelector((state) => get(state, path));
  return value;
};

export const useReduxSetter = (path, name) => {
  const dispatch = useDispatch();
  const type = name || `SET[${path}]`;
  const action = (payload) => dispatch({ type, payload, meta: { path } });
  return action;
};
