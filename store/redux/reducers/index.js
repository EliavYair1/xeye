import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import counterReducer from "./counterSlice";
import onlineReducer from "./onlineStatusSlice";

import agentReducer from "./agentSlice";
import timerReducer from "./timeSlice";
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  agent: agentReducer,
  online: onlineReducer,
  time: timerReducer,
});

export default rootReducer;
