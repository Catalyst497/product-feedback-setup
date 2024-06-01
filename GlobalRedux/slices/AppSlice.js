import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    feedbackFormOpen: false,
    feedbacks: [],
    sideBarOpen: false
  },
  reducers: {
    setFeedbackFormOpen(state, { payload }) {
      state.feedbackFormOpen = !state.feedbackFormOpen;
    },
    setFeedbacks: (state, {payload}) => {
      state.feedbacks = payload
    },
    setSideBarOpen(state, { payload }) {
      state.sideBarOpen = payload;
    },
  },
});

export default appSlice.reducer;
export const { setFeedbackFormOpen, setFeedbacks, setSideBarOpen } = appSlice.actions;
