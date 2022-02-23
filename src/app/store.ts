import { combineReducers, createStore } from "@reduxjs/toolkit";
import { serversReducer } from "../features/servers/serversSlice";
import { usersReducer } from "../features/users/usersSlice";

const reducers = combineReducers({
  users: usersReducer,
  servers: serversReducer,
});

export const store = createStore(reducers);

export type StoreType = ReturnType<typeof reducers>;
