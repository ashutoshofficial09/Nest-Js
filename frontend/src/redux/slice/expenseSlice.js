import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    quantity: 0,
  },
  reducers: {
    increment: (state) => {
      state.quantity += 1;
    },
    decrement(state) {
      return (state = this.initialState - 1);
    },
  },
});

export const expenseAction = expenseSlice.actions;

export default expenseSlice;
