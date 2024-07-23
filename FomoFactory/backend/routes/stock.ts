import Stock from "../models/stocks";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/:symbol", async (req: Request, res: Response) => {
  try {
    const symbol = req.params.symbol;

    const stocks = await Stock.find({ id: symbol })
      .sort({ timestamp: -1 })
      .limit(20);

    if (stocks.length === 0) {
      // If no stocks are found
      return res
        .status(404)
        .send({ message: "No stocks found for the given symbol" });
    }

    res.status(200).send(stocks);
  } catch (err) {
    console.error("Error fetching stock data:", err);
    // Send a 500 status code with the error message in case of failure
    res.status(500).send({ message: "Server error", error: err });
  }
});

export default router;
