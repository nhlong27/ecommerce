import axios from 'axios';
import * as cheerio from 'cheerio';

interface ScrapedData {
  image?: string;
  title?: string;
  size?: string;
  quantity?: string;
  sku?: string;
}

const scrapeWebsite = async (src: string, type: string = 'link'): Promise<ScrapedData[]> => {
  try {
    const scrapedData: ScrapedData[] = [];

    if (type === 'link') {
      
      const $ = cheerio.load(src);

      $('.product-item').each((index, element) => {
        let obj: ScrapedData = {};
        obj.image = $(element).find('.thumb > img').attr('src');
        obj.title = $(element).find('.details > a').attr('title');

        $(element)
          .find('.product-value')
          .each((i, link) => {
            switch (i) {
              case 0:
                obj.size = $(link).text().trim();
                break;
              case 1:
                obj.quantity = $(link).text().trim();
                break;
              case 2:
                obj.sku = $(link).text().trim();
                break;
            }
          });

        scrapedData.push(obj);
      });

      return scrapedData;
    }
  } catch (err) {
    console.error(err);
  }

  return [];
};

export { scrapeWebsite };
