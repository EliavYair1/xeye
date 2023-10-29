import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import counterReducer from "./counterSlice";
import onlineReducer from "./onlineStatusSlice";
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,

  online: onlineReducer,
});

export default rootReducer;
