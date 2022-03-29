import { combineReducers, compose, createStore } from "@reduxjs/toolkit";
import { serversReducer } from "../features/servers/serversSlice";
import { usersReducer } from "../features/users/usersSlice";

const reducers = combineReducers({
  users: usersReducer,
  servers: serversReducer,
});

export const store = createStore(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export type StoreType = ReturnType<typeof reducers>;
