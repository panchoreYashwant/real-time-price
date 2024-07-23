import mongoose, { Document, Schema } from "mongoose";

interface IStock extends Document {
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
  roi: any;
  last_updated: Date;
  price_change_percentage_1h_in_currency: number;
  timestamp: Date;
}

const stockSchema: Schema<IStock> = new mongoose.Schema({
  id: { type: String, required: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  current_price: { type: Number, required: true },
  market_cap: { type: Number, required: true },
  market_cap_rank: { type: Number, required: true },
  fully_diluted_valuation: { type: Number, required: true },
  total_volume: { type: Number, required: true },
  high_24h: { type: Number, required: true },
  low_24h: { type: Number, required: true },
  price_change_24h: { type: Number, required: true },
  price_change_percentage_24h: { type: Number, required: true },
  market_cap_change_24h: { type: Number, required: true },
  market_cap_change_percentage_24h: { type: Number, required: true },
  circulating_supply: { type: Number, required: true },
  total_supply: { type: Number, required: true },
  max_supply: { type: Number },
  ath: { type: Number, required: true },
  ath_change_percentage: { type: Number, required: true },
  ath_date: { type: Date, required: true },
  atl: { type: Number, required: true },
  atl_change_percentage: { type: Number, required: true },
  atl_date: { type: Date, required: true },
  roi: { type: Schema.Types.Mixed },
  last_updated: { type: Date, required: true },
  price_change_percentage_1h_in_currency: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Stock = mongoose.model<IStock>("Stock", stockSchema);

export default Stock;
