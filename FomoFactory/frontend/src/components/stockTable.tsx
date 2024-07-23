"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks, setSymbol } from "../slices/stockSlice";
import { Image, Table, Select, Modal, Button } from "antd";

const { Option } = Select;

const StockTable = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const stocks = useSelector((state: any) => state.stocks.data);
  const symbol = useSelector((state: any) => state.stocks.symbol);

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchStocks(symbol));
    // Set interval to fetch data every 10 seconds
    const interval = setInterval(() => dispatch(fetchStocks(symbol)), 10000);
    return () => clearInterval(interval);
  }, [dispatch, symbol]);

  const handleSymbolChange = (value: string) => {
    dispatch(setSymbol(value));
    setVisible(false);
  };

  const columns = [
    {
      title: "Sr. #",
      key: "src",
      render: (__: any, record: any, index: number) => index + 1,
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (__: any, record: any) => (
        <Image width={50} height={50} src={record.image} alt={record.name} />
      ),
    },
    {
      title: "Current Price",
      dataIndex: "current_price",
      key: "current_price",
    },
    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "market_cap",
    },
    {
      title: "1h Change",
      dataIndex: "price_change_percentage_1h_in_currency",
      key: "price_change_percentage_1h_in_currency",
      render: (text: number) => (
        <span style={{ color: text > 0 ? "green" : "red" }}>
          {text.toFixed(2)}%
        </span>
      ),
    },
    {
      title: "24h Change",
      dataIndex: "price_change_percentage_24h",
      key: "price_change_percentage_24h",
      render: (text: number) => (
        <span style={{ color: text > 0 ? "green" : "red" }}>
          {text.toFixed(2)}%
        </span>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginBottom: 20,
          marginRight: 20,
        }}
      >
        <Button onClick={() => setVisible(true)} type="primary">
          Change Coin
        </Button>
      </div>
      <Table
        size="small"
        columns={columns}
        dataSource={stocks || []}
        rowKey="_id"
        pagination={false}
        scroll={{ y: "80vh" }}
      />

      <Modal
        title="Change Symbol"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Select
          defaultValue={symbol}
          style={{ width: 200, marginBottom: 16 }}
          onChange={handleSymbolChange}
        >
          <Option value="bitcoin">Bitcoin</Option>
          <Option value="ethereum">Ethereum</Option>
          <Option value="litecoin">Litecoin</Option>
          <Option value="dogecoin">Dogecoin</Option>
          <Option value="ripple">Ripple</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default StockTable;
