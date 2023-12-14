const express = require('express');
const router = express.Router();
const fetchMachines = require('../controllers/fetchController');
const { processMachines } = require('../controllers/machineController');
const {
  writeToFile,
  readFromFile,
} = require('../controllers/writerController');

router.get('/fetch-data', async (req, res) => {
  try {
    const urls = [
      'https://www.avxcafe.hu/kavekeszito-eszkozok-7822/kavegepek-7825/karos-kavegepek-7828/avx-kavegepek-8290',
      'https://www.avxcafe.hu/kavekeszito-eszkozok-7822/kavegepek-7825/karos-kavegepek-7828/avx-kavegepek-8290?page=2',
    ];
    const machines = [
      {
        title: '\n    AVX EM3202SW Hófehérke Kávégép\n    ',
        currentPrice: '59.990 Ft',
        itemNumber: '\n    Cikkszám: 5000A\n',
      },
      {
        title: '\n    AVX EM3202SW Hófehérke Kávégép + Barista csomag\n    ',
        currentPrice: '77.770 Ft',
        itemNumber: '\n    Cikkszám: 5000A1\n',
      },
      {
        title:
          '\n    AVX EM3202SW Hófehérke Kávégép + Barista csomag + CG1 Kávéőrlő\n    ',
        currentPrice: '94.440 Ft',
        itemNumber: '\n    Cikkszám: 5000A2\n',
      },
      {
        title: '\n    AVX EM3202SW Hófehérke Kávégép + CG1 Kávéőrlő\n    ',
        currentPrice: '77.770 Ft',
        itemNumber: '\n    Cikkszám: 5000A21\n',
      },
      {
        title:
          '\n' +
          '    AVX EM3202SW Hófehérke Kávégép + Barista csomag + AVX 1065 kéziőrlő \n' +
          '    ',
        currentPrice: '89.990 Ft',
        itemNumber: '\n    Cikkszám: 5000A3\n',
      },
      {
        title:
          '\n' +
          '    AVX EM3202SW Hófehérke Kávégép + Barista csomag + Kingrinder K4 kéziőrlő \n' +
          '    ',
        currentPrice: '109.990 Ft',
        itemNumber: '\n    Cikkszám: 5000A4\n',
      },
      {
        title:
          '\n' +
          '    AVX EM3202SW Hófehérke Kávégép + Barista csomag + Kingrinder K6 kéziőrlő \n' +
          '    ',
        currentPrice: '114.990 Ft',
        itemNumber: '\n    Cikkszám: 5000A5\n',
      },
      {
        title: '\n    AVX EM TB1 2022 Kávégép-Akció!\n    ',
        currentPrice: '79.990 Ft',
        itemNumber: '\n    Cikkszám: 500A\n',
      },
      {
        title: '\n    AVX EM TB1 2022 Kávégép + TB1 Barista csomag\n    ',
        currentPrice: '99.990 Ft',
        itemNumber: '\n    Cikkszám: 500A1\n',
      },
      {
        title: '\n    AVX EM TB1 2022 Kávégép + AVX CG1 Kávéőrlő-Akció!\n    ',
        currentPrice: '88.880 Ft',
        itemNumber: '\n    Cikkszám: 500A3\n',
      },
      {
        title: '\n    AVX EM TB1 Plus Kávégép\n    ',
        currentPrice: '129.990 Ft',
        itemNumber: '\n    Cikkszám: 500B\n',
      },
      {
        title: '\n    AVX DB1 Dual bojleres kávégép\n    ',
        currentPrice: '199.990 Ft',
        itemNumber: '\n    Cikkszám: 500C\n',
      },
      {
        title: '\n    AVX DB1 Dual bojleres kávégép + OPV 9 BAR\n    ',
        currentPrice: '219.990 Ft',
        itemNumber: '\n    Cikkszám: 500C0\n',
      },
      {
        title:
          '\n' +
          '    AVX DB1 Dual bojleres kávégép + AVX EG001 Elektromos őrlő -Akció!\n' +
          '    ',
        currentPrice: '249.990 Ft',
        itemNumber: '\n    Cikkszám: 500C01\n',
      },
      {
        title: '\n    AVX DB1 Dual bojleres kávégép + DB1 barista csomag\n    ',
        currentPrice: '219.990 Ft',
        itemNumber: '\n    Cikkszám: 500C2\n',
      },
      {
        title:
          '\n    AVX DB1 Dual bojleres kávégép + Kingrinder K4 kéziőrlő\n    ',
        currentPrice: '229.990 Ft',
        itemNumber: '\n    Cikkszám: 500C2A\n',
      },
      {
        title:
          '\n    AVX DB1 Dual bojleres kávégép + Kingrinder K6 kéziőrlő\n    ',
        currentPrice: '229.990 Ft',
        itemNumber: '\n    Cikkszám: 500C2A2\n',
      },
      {
        title: '\n    AVX DB1-TB1 egyes kifolyó G.M16  h.45mm\n    ',
        currentPrice: '2.990 Ft',
        itemNumber: '\n    Cikkszám: 652E12\n',
      },
    ];
    //const machines = await fetchMachines(urls);
    processMachines(machines);
    writeToFile(machines);
    res.json(machines);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error.');
  }
});
router.get('/old-data', async (req, res) => {
  try {
    const oldMachines = await readFromFile();
    res.json(oldMachines);
  } catch (err) {}
});

module.exports = router;
