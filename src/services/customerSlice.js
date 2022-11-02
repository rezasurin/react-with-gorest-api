import { createSlice, current } from "@reduxjs/toolkit";
import { customerApi } from "./customer";

const initState = {
  data: [],
};

export const customerSlice = createSlice({
  name: "customerSlice",
  initialState: initState,
  reducers: {
    deleteCustomer: (state, action) => {
      state.data = current(state).data.filter(
        (item) => item.id !== +action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      customerApi.endpoints.getListCustomer.matchFulfilled,
      (state, { payload }) => {
        state.data = payload.data;
      }
    );
  },
});

export const { deleteCustomer } = customerSlice.actions;
