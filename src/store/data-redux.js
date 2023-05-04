import { createSlice, configureStore } from "@reduxjs/toolkit";
const counterSlice = createSlice({
  name: "mySLice",
  initialState: {
    valueEntered: [],
  },
  reducers: {
    getTheValue(state, action) {
      console.log(state);
      console.log(action.payload);
    },
    filterData(state, action) {
      console.log(state);
      console.log(action.payload);
      state.valueEntered = action.payload;
    },
  },
});

export const counterSliceActions = counterSlice.actions;
const store = configureStore({
  reducer: counterSlice.reducer,
});

export default store;
