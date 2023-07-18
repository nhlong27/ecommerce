import { NextApiRequest as Request, NextApiResponse as Response } from 'next';
import { Builder, until, Browser } from 'selenium-webdriver';
import fs from 'fs';
import { scrapeWebsite } from './.scrapeWebsite';



export default function handler(req: Request, res: Response) {
  let productArray: any[] = [];
  console.log('starting');
  let driver = new Builder()
  .forBrowser(Browser.CHROME)
  .usingServer('http://localhost:4444/wd/hub')
  .build();
  const getPage = async (i: string) => {
    await driver.get(
      `https://www.pepsicopartners.com/pepsico/en/USD/PEPSICO-BRANDS/PEPSI%C2%AE/c/brand_pepsi?q=%3Arelevance%3AdisplayCategory%3Atrue%3AlocationAvailibility%3Atrue&productType=Product&text=&page=${i}&showProductListing=true`,
    );
  
    const SCROLL_PAUSE_TIME = 500;
    let lastHeight = await driver.executeScript('return document.body.scrollHeight');
    while (true) {
      await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
      await driver.sleep(SCROLL_PAUSE_TIME);
      const newHeight = await driver.executeScript('return document.body.scrollHeight');
      if (newHeight === lastHeight) {
        break;
      }
      lastHeight = newHeight;
    }
    const html = await driver.getPageSource();
    if (html) console.log('html')
    const result = await scrapeWebsite(html, 'link');
    return result;
  };
  (async () => {
    // for (let i of [0,1,2,3,4,5,6,7]){
    //   let result = await getPage(i.toString());
    //   productArray = productArray.concat(result)
    // }
    let result = await getPage('0');
    productArray = productArray.concat(result);
    saveTextToFile('public/products.json', JSON.stringify(productArray));
  })()
    .catch((error) => console.error(error))
    .finally(() => {
      driver.quit();
    });
  console.log('ended');
  return res.status(200).send(productArray);
}



const saveTextToFile = (filepath: string, text: string) => {
  fs.writeFile(filepath, text, 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
};
