import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
});

export type GlobalState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    const customMiddleware = [routerMiddleware(history)];

    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(customMiddleware);
  },
});

export default store;
