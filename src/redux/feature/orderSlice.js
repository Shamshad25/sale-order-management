import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchActiveOrdersAPI = async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/Shamshad25/data/sale"
  );
  const result = await response.json();

  const activeOrders = result.filter((item) => item.paid === false);

  return activeOrders;
};

const fetchCompletedOrdersAPI = async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/Shamshad25/data/sale"
  );
  const result = await response.json();

  const completedOrders = result.filter((item) => item.paid === true);

  return completedOrders;
};

const fetchProductsAPI = async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/Shamshad25/data/product"
  );

  const result = await response.json();

  return result;
};

const fetchCustomersAPI = async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/Shamshad25/data/customer"
  );

  const result = await response.json();

  console.log("fetchCustomer", result);

  return result;
};

export const fetchActiveOrders = createAsyncThunk(
  "orders/fetchActiveOrders",
  fetchActiveOrdersAPI
);
export const fetchCompletedOrders = createAsyncThunk(
  "orders/fetchCompletedOrders",
  fetchCompletedOrdersAPI
);

export const fetchProducts = createAsyncThunk(
  "orders/fetchProducts",
  fetchProductsAPI
);

export const fetchCustomers = createAsyncThunk(
  "orders/fetchCustomers",
  fetchCustomersAPI
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    activeOrders: [],
    completedOrders: [],
    products: [],
    customers: [],
    loading: false,
  },
  reducers: {
    addOrder: (state, action) => {
      state.activeOrders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.activeOrders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.activeOrders[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActiveOrders.fulfilled, (state, action) => {
        state.activeOrders = action.payload;
        state.loading = false;
      })
      .addCase(fetchCompletedOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompletedOrders.fulfilled, (state, action) => {
        state.completedOrders = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export const { addOrder, updateOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
