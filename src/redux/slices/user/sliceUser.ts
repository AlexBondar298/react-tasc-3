import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "./types";

const initialState: UserProps = {
  email: null,
  token: null,
  id: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (
      state,
      action: PayloadAction<{
        email: string | null;
        token: string | null;
        id: string | null;
      }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser: (state, action) => {
      state.email = null;           
      state.token = null;
      state.id = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
