import { BackupNews } from "./backupNews";
import jssoup from "@aghajari/jssoup";
import axios from "axios";
import Cache from "node-cache";
const cache = new Cache();

type Props = {
  title: string;
  link: string;
  category: string;
};
class News {
  async getNews(url: string) {
    let response = cache.get("crawler");
    if (response) {
      // return response;
    }
    return this.refine(await this.html(url));
  }

  async html(url: string) {
    const res = await axios.get(url);
    return res.data;
  }

  refine(html: string) {
    const response: Props[] = [];
    const news = jssoup.load(html).find(".sc-d1d6e607-0 .gYerqE");
    for (let i = 0; i < news.length; i++) {
      const category = news[i].findFirst(".sc-e218a163-17 .cYJOs");
      const content = news[i].findFirst(".touch-area");
      response.push({
        title: content.plainText(),
        link: "https://exame.com" + content.getValue("href"),
        category: category.plainText()
      });
    }

    return response.length > 0 ? response : BackupNews;
  }
}
export default new News();
