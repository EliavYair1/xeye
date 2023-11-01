import { createSlice } from "@reduxjs/toolkit";

const agentSlice = createSlice({
  name: "agent",
  initialState: {
    agentInfo: null,
  },
  reducers: {
    setAgentInfo: (state, action) => {
      state.agentInfo = action.payload;
    },
  },
});

export const { setAgentInfo } = agentSlice.actions;
export default agentSlice.reducer;
