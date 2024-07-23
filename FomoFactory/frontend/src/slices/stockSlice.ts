// slices/stockSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStocks = createAsyncThunk(
  "stocks/fetchStocks",
  async (symbol: string) => {
    const response = await axios.get(
      `http://localhost:5000/api/stocks/${symbol}`
    );
    return response.data;
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    data: [],
    symbol: "bitcoin",
    status: "idle",
    error: null,
  },
  reducers: {
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSymbol } = stockSlice.actions;

export default stockSlice.reducer;
