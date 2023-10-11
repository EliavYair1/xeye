import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import counterReducer from "./counterSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

export default rootReducer;
