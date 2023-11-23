const axios = require('axios');
const cheerio = require('cheerio');

const fetchMachines = async (urls) => {
  const machines = [];
  for (const url of urls) {

  
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  $('div.product-snapshot.list_div_item').each((index, el) => {
    const machine = $(el);
    const title = machine
      .find('h2.product-card-item.product-card-title.h4')
      .text();
    const oldPrice = machine.find('del.product-price-original.mr-2').text();
    const currentPrice = machine.find('span.product-price').text();
    const specialPrice = machine.find('span.product-price-special').text();
    machines.push({
      title: title,
      oldPrice: oldPrice,
      currentPrice: currentPrice,
      specialPrice: specialPrice,
    });
  });
}
  return machines;
};

module.exports = fetchMachines;
