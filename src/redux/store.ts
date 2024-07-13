import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./slices/user/sliceUser";
import tableReducer from "./slices/tableOrders/sliceTableOrders";
import newOrderReducer from "./slices/newOrder/sliceNewOrder";

export const store = configureStore({
  reducer: {
    user: userReduser,
    table: tableReducer,
    newOrder:newOrderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
