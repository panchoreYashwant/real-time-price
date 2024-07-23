import axios, { AxiosResponse } from "axios";
import mongoose from "mongoose";
import cron from "node-cron";
import Stock from "./models/stocks";

interface StockData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  roi: any; // Specify exact type if known
  last_updated: Date;
  price_change_percentage_1h_in_currency: number;
  timestamp: Date;
}

const fetchStockData = async () => {
  try {
    const symbols = ["bitcoin", "ethereum", "litecoin", "dogecoin", "ripple"];
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${symbols.join(
      ","
    )}&price_change_percentage=1h&precision=2`;
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    const response: AxiosResponse<StockData[]> = await axios.get(url, options);
    const stockData = response.data;

    for (const stock of stockData) {
      const newStock = new Stock(stock);
      await newStock.save();
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
  }
};

// Schedule the function to run every 10 seconds
cron.schedule("*/10 * * * * *", fetchStockData);
