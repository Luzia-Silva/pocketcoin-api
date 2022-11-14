import axios from "axios";
import { Request, Response } from "express";

class AmountController {
  async find(request: Request, response: Response) {
    try {
      const { data } = await axios(
        "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,JPY-EUR"
      );
      const amount = Object.entries(data).map(([key, value]) => ({
        coin: key,
        elements: value
      }));
      return response.json(amount);
    } catch (error) {
      return response.status(500).send({
        error: "Something wrong happened, try again",
        message: error
      });
    }
  }
}
export default new AmountController();
