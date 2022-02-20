import { combineReducers, createStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/user/userSlice";

const reducers = combineReducers({ user: userReducer });

export const store = createStore(reducers);

export type StoreType = ReturnType<typeof reducers>;
