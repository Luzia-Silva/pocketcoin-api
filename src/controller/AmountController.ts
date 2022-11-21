import axios from "axios";
import { Request, Response } from "express";

class AmountController {
  async findOne(request: Request, response: Response) {
    const { coins } = request.params;
    try {
      const { data } = await axios(
        `https://economia.awesomeapi.com.br/last/${coins}`
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
  async find(request: Request, response: Response) {
    const coins = "USD-BRL,EUR-BRL,BTC-BRL,JPY-EUR";
    try {
      const { data } = await axios(
        `https://economia.awesomeapi.com.br/last/${coins}`
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
  async findlist(request: Request, response: Response) {
    const coins = "USD-BRL,EUR-BRL,BTC-BRL,JPY-EUR";
    try {
      const { data } = await axios(
        `https://economia.awesomeapi.com.br/last/${coins}`
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
