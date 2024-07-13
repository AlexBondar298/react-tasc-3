import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableBodyProps, AddOrderArgs } from "../tableOrders/types";
import { database } from "../../../firebase";
import { ref, get, child, update } from "firebase/database";
import { Status } from "../tableOrders/types";

// ----------------------- editOrder ------------------------------------------------------------------
export const editOrderSlice = createAsyncThunk<
  TableBodyProps,
  AddOrderArgs,
  { rejectValue: string }
>(
  "tableOrders/editOrderSlice",
  async ({ data, table }, { rejectWithValue }) => {
    try {
      const index = (): number | undefined => {
        const foundIndex = table.tableData.findIndex(
          (elem) => elem.id === data.id
        );
        return foundIndex !== -1 ? foundIndex : undefined;
      };
      console.log("editOrderSlice надо", data.edit);
      const orderNum: string = index() + "";
      const orderRef = ref(database, `${orderNum}`); // возможно переделать чтобы сразу приходила длина
      // const orderRef = ref(database, "str"); // возможно переделать чтобы сразу приходила длина
      await update(orderRef, data);
      return data;
    } catch (error) {
      return rejectWithValue("Error adding data to Firebase");
    }
  }
);
// ----------------------- END addOrder ------------------------------------------------------------------

const initialState: TableBodyProps = {
  date: "23.11.23",
  name: "Manager 007",
  id: "",
  type: "",
  customer: "",
  supplier: "",
  completed: "",
  status: "New",
  position: "",
  email: "email",
  telephone: "",
  notes: "",
  edit: false,
};

const newOrderSlice = createSlice({
  name: "newOrder",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<TableBodyProps>) => {
      state.date = action.payload.date;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.type = action.payload.type;
      state.customer = action.payload.customer;
      state.supplier = action.payload.supplier;
      state.completed = action.payload.completed;
      state.status = action.payload.status;
      state.position = action.payload.position;
      state.email = action.payload.email;
      state.telephone = action.payload.telephone;
      state.notes = action.payload.notes;
      state.edit = true;
    },
    removeEdit: (state) => {
      state.date = "23.11.22";
      state.name = "Tom Kruz";
      state.id = "";
      state.type = "Retail";
      state.customer = "";
      state.supplier = "";
      state.completed = "";
      state.status = "New";
      state.position = "";
      state.email = "";
      state.telephone = "";
      state.notes = "";
      state.edit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editOrderSlice.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        editOrderSlice.fulfilled,
        (state, action: PayloadAction<TableBodyProps>) => {
          state.date = action.payload.date;
          state.name = action.payload.name;
          state.id = action.payload.id;
          state.type = action.payload.type;
          state.customer = action.payload.customer;
          state.supplier = action.payload.supplier;
          state.completed = action.payload.completed;
          state.status = action.payload.status;
          state.position = action.payload.position;
          state.email = action.payload.email;
          state.telephone = action.payload.telephone;
          state.notes = action.payload.notes;
          state.status = Status.SUCCESS;
        }
      )
      .addCase(editOrderSlice.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export const { setOrder, removeEdit } = newOrderSlice.actions;
export default newOrderSlice.reducer;
