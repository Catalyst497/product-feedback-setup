import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUserState: function (state, { payload }) {
      state.user = payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserState } = userSlice.actions;
