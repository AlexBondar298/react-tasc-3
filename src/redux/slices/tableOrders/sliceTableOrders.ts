import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableProps, TableBodyProps, Status, AddOrderArgs } from "./types";
import { ref, get, child, update } from "firebase/database";
import { database } from "../../../firebase";

// ----------------------- fetchTableData ------------------------------------------------------------------

export const fetchTableData = createAsyncThunk(
  "tableOrders/fetchTableData",
  async (_, { rejectWithValue }) => {
    const dbRef = ref(database);
    try {
      const snapshot = await get(child(dbRef, "/"));
      if (snapshot.exists()) {
        return snapshot.val() as TableBodyProps[];
      } else {
        return rejectWithValue("No data available");
      }
    } catch (error) {
      return rejectWithValue("Error fetching data");
    }
  }
);
// ----------------------- addOrder ------------------------------------------------------------------
export const addEditOrder = createAsyncThunk<
  TableBodyProps,
  AddOrderArgs,
  { rejectValue: string }
>("tableOrders/addOrder", async ({ data, table }, { rejectWithValue }) => {
  if (data.edit) {
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
  } else {
    try {
      const orderNum: string = table.tableData.length + "";
      const orderRef = ref(database, `${orderNum}`); // возможно переделать чтобы сразу приходила длина
      // const orderRef = ref(database, "str"); // возможно переделать чтобы сразу приходила длина
      await update(orderRef, data);
      return data;
    } catch (error) {
      return rejectWithValue("Error adding data to Firebase");
    }
  }
});

// ----------------------- END functions ------------------------------------------------------------------

const initialState: TableProps = {
  tableData: [],
  status: Status.LOADING,
};

const tableOrdersSlice = createSlice({
  name: "tableOrders",
  initialState,
  reducers: {
    addDataTable: (state, action: PayloadAction<TableBodyProps>) => {
      state.tableData.push(action.payload);
    },
    sortDataTable: (state, action: PayloadAction<keyof TableBodyProps>) => {
      const parametr = action.payload;
      if (typeof parametr === "string") {
        state.tableData.sort((a, b) => {
          const valueA = a[parametr];
          const valueB = b[parametr];

          if (typeof valueA === "string" && typeof valueB === "string") {
            if (parametr === "date") {
              return valueA.split(".").reverse().join("") >
                valueB.split(".").reverse().join("")
                ? 1
                : valueA.split(".").reverse().join("") <
                  valueB.split(".").reverse().join("")
                ? -1
                : 0;
            }
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
          }
          return 0;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEditOrder.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        addEditOrder.fulfilled,
        (state, action: PayloadAction<TableBodyProps>) => {
          state.tableData.push(action.payload);
          state.status = Status.SUCCESS;
        }
      )
      .addCase(addEditOrder.rejected, (state) => {
        state.status = Status.ERROR;
      })
      .addCase(fetchTableData.pending, (state) => {
        state.tableData = [];
        state.status = Status.LOADING;
      })
      .addCase(
        fetchTableData.fulfilled,
        (state, action: PayloadAction<TableBodyProps[]>) => {
          state.tableData = action.payload;
          state.status = Status.SUCCESS;
        }
      )
      .addCase(fetchTableData.rejected, (state) => {
        state.tableData = [];
        state.status = Status.ERROR;
      });
  },
});

export const { addDataTable, sortDataTable } = tableOrdersSlice.actions;
export default tableOrdersSlice.reducer;
