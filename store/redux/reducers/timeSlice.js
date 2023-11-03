import { createSlice } from "@reduxjs/toolkit";

const timeSlice = createSlice({
  name: "time",
  initialState: {
    elapsed: 0,
  },
  reducers: {
    incrementElapsed: (state) => {
      // Increment the elapsed time by 1000 milliseconds (1 second)
      state.elapsed += 1000;
    },
    resetElapsed: (state) => {
      // Reset the elapsed time to 0
      state.elapsed = 0;
    },
  },
});

export const { incrementElapsed, resetElapsed } = timeSlice.actions;
export default timeSlice.reducer;
