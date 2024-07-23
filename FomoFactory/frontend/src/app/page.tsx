"use client";

// pages/index.tsx
import React from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import StockTable from "@/components/stockTable";

const HomePage = () => {
  return (
    <Provider store={store}>
      <div style={{ margin: 10 }}>
        <h1>Real-Time Stock Prices</h1>
        <StockTable />
      </div>
    </Provider>
  );
};

export default HomePage;
