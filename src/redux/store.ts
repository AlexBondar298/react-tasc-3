import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./slices/user/sliceUser";

export const store = configureStore({
  reducer: {
    user: userReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
