const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const machines = [
  {
    title: '\n    AVX EM3202SW Hófehérke Kávégép\n    ',
    price: '59.990 Ft',
  },
  {
    title: '\n    AVX EM3202SW Hófehérke Kávégép + Barista csomag\n    ',
    price: '79.990 Ft',
  },
  {
    title:
      '\n    AVX EM3202SW Hófehérke Kávégép + Barista csomag + CG5 Kávéőrlő\n    ',
    price: '99.990 Ft',
  },
  {
    title:
      '\n' +
      '    AVX EM3202SW Hófehérke Kávégép + Barista csomag + AVX 1065 kéziőrlő \n' +
      '    ',
    price: '94.990 Ft',
  },
  {
    title:
      '\n' +
      '    AVX EM3202SW Hófehérke Kávégép + Barista csomag + Kingrinder K4 kéziőrlő \n' +
      '    ',
    price: '109.990 Ft',
  },
  {
    title:
      '\n' +
      '    AVX EM3202SW Hófehérke Kávégép + Barista csomag + Kingrinder K6 kéziőrlő \n' +
      '    ',
    price: '114.990 Ft',
  },
  {
    title: '\n    AVX EM TB1 2022 Kávégép-Akció!\n    ',
    price: '79.990 Ft',
  },
  {
    title: '\n    AVX EM TB1 2022 Kávégép + TB1 Barista csomag\n    ',
    price: '99.990 Ft',
  },
  {
    title: '\n    AVX EM TB1 2022 Kávégép + AVX CG1 Kávéőrlő\n    ',
    price: '99.990 Ft',
  },
  {
    title: '\n    AVX EM TB1 2022 Kávégép + AVX CG5 Kávéőrlő-Akció!\n    ',
    price: '109.990 Ft',
  },
  {
    title:
      '\n' +
      '    AVX EM TB1 2022 Kávégép + AVX CG5 Kávéőrlő + TB1 Barista csomag-Akció!\n' +
      '    ',
    price: '129.990 Ft',
  },
  {
    title:
      '\n' +
      '    AVX EM TB1 2022 Kávégép + AVX 1065 48mm-es késes Kéziőrlő + kiegészítők\n' +
      '    ',
    price: '109.990 Ft',
  },
];
exports.fetchMachines = (req, res) => {
  try {
    //const response = await axios.get('https://www.avxcafe.hu/kavekeszito-eszkozok-7822/kavegepek-7825/karos-kavegepek-7828/avx-kavegepek-8290');
    //const html = response.data;
    // const $ = cheerio.load(html);

    /*$('div.product-snapshot.list_div_item').each((index, el) => {
            const machine = $(el);
            const title = machine.find('h2.product-card-item.product-card-title.h4').text();
            let price = machine.find('span.product-price').text();
            if (price === '') price = machine.find('span.product-price-special').text();
            machines.push({
                title: title,
                price: price
            });
        });*/
    /*fs.writeFile('test/test.csv', machines.toString(), 'utf8', (err) => {
            if(err) {
                console.log('some error occures', err);
            } else {
                console.log('savedd');
            }
        });*/
    const writeStream = fs.createWriteStream('../output/data.txt');
    machines.forEach((machine) => {
      const line = Buffer.from(
        `Gép neve: ${machine.title} - gép ára: ${machine.price} \n`,
        'utf8'
      ).toString('utf8');
      writeStream.write(line);
    });
    res.json(machines);
  } catch (err) {
    console.error(err);
  }
};
//fetchMachines().then(machines => console.log(machines));
