import { Request, Response } from "express";
import crawler from "../crawler";

class NewsController {
  async find(request: Request, response: Response) {
    try {
      const url = await crawler.getNews(
        "https://exame.com/noticias-sobre/moedas/"
      );
      return response.send(url);
    } catch (error) {
      return response.status(500).send({
        error: "Something wrong happened, try again",
        message: error
      });
    }
  }
}
export default new NewsController();
