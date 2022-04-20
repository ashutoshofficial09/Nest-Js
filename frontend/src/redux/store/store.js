import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "../slice/expenseSlice";

const store = configureStore({
  reducer: {
    expense: expenseSlice.reducer,
  },
});

export default store;
