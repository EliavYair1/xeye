import { createSlice } from "@reduxjs/toolkit";

const onlineSlice = createSlice({
  name: "online",
  initialState: {
    isOnline: false,
  },
  reducers: {
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { setOnlineStatus } = onlineSlice.actions;
export const selectOnlineStatus = (state) => state.online.isOnline;

export default onlineSlice.reducer;
