const axios = require("axios");
const jssoup = require('@aghajari/jssoup')
const Cache = require("node-cache");
const cache = new Cache();

class News {
    async getNews(url) {
        let response = cache.get("crawler");
        if (response) {
            // return response;
        }
        return this.refine(await this.html(url))
    }

    async html(url) {
        const res = await axios.get(url);
        return res.data;
    }

    refine(html) {
        const response = [];
        const news = jssoup.load(html).find('.sc-d1d6e607-0 .gYerqE');
        for (let i = 0; i < news.length; i++) {
            const category = news[i].findFirst('.sc-6f550442-17 .cwkAqB')
            const content = news[i].findFirst('.touch-area')
        response.push({title: content.plainText(), link: 'https://exame.com' + content.getValue('href'),
         category: category.plainText()})
        }
        
        return response; 

    }
}

module.exports = new News()