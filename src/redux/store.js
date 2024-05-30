import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./feature/orderSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});
