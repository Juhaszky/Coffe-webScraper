const express = require('express');
const router = express.Router();
const fetchMachines = require('../controllers/fetchController');
const { processMachines } = require('../controllers/machineController');
const { writeToFile } = require('../controllers/writerController');

router.get('/fetch-data', async (req, res) => {
  try {
    const urls = [
      'https://www.avxcafe.hu/kavekeszito-eszkozok-7822/kavegepek-7825/karos-kavegepek-7828/avx-kavegepek-8290',
      'https://www.avxcafe.hu/kavekeszito-eszkozok-7822/kavegepek-7825/karos-kavegepek-7828/avx-kavegepek-8290?page=2',
    ];
    const machines = [
      {
        title: '\n    AVX EM3202SW Hófehérke Kávégép\n    ',
        oldPrice: '',
        currentPrice: '59.990 Ft',
        specialPrice: '',
      },
      {
        title: '\n    AVX EM3202SW Hófehérke Kávégép + Barista csomag\n    ',
        oldPrice: '84.540 Ft',
        currentPrice: '',
        specialPrice: '79.990 Ft',
      },
      {
        title:
          '\n    AVX EM3202SW Hófehérke Kávégép + Barista csomag + CG5 Kávéőrlő\n    ',
        oldPrice: '121.530 Ft',
        currentPrice: '',
        specialPrice: '99.990 Ft',
      },
      {
        title: '\n    AVX EM3202SW Hófehérke Kávégép + CG5 Kávéőrlő\n    ',
        oldPrice: '96.980 Ft',
        currentPrice: '',
        specialPrice: '79.990 Ft',
      },
      {
        title:
          '\n    AVX EM3202SW Hófehérke Kávégép + Barista csomag + AVX 1065 kéziőrlő \n    ',
        oldPrice: '114.530 Ft',
        currentPrice: '',
        specialPrice: '94.990 Ft',
      },
      {
        title:
          '\n    AVX EM3202SW Hófehérke Kávégép + Barista csomag + Kingrinder K4 kéziőrlő \n    ',
        oldPrice: '134.530 Ft',
        currentPrice: '',
        specialPrice: '109.990 Ft',
      },
      {
        title:
          '\n    AVX EM3202SW Hófehérke Kávégép + Barista csomag + Kingrinder K6 kéziőrlő \n    ',
        oldPrice: '139.530 Ft',
        currentPrice: '',
        specialPrice: '114.990 Ft',
      },
      {
        title: '\n    AVX EM TB1 2022 Kávégép-Akció!\n    ',
        oldPrice: '89.990 Ft',
        currentPrice: '',
        specialPrice: '79.990 Ft',
      },
      {
        title: '\n    AVX EM TB1 2022 Kávégép + TB1 Barista csomag\n    ',
        oldPrice: '',
        currentPrice: '99.990 Ft',
        specialPrice: '',
      },
      {
        title: '\n    AVX EM TB1 2022 Kávégép + AVX CG1 Kávéőrlő\n    ',
        oldPrice: '',
        currentPrice: '99.990 Ft',
        specialPrice: '',
      },
      {
        title: '\n    AVX EM TB1 Plus Kávégép\n    ',
        oldPrice: '',
        currentPrice: '129.990 Ft',
        specialPrice: '',
      },
      {
        title: '\n    AVX EM TB1 Plus Kávégép + CG5 kávéőrlő-Akció!\n    ',
        oldPrice: '169.980 Ft',
        currentPrice: '',
        specialPrice: '149.990 Ft',
      },
      {
        title: '\n    AVX DB1 Dual bojleres kávégép\n    ',
        oldPrice: '',
        currentPrice: '199.990 Ft',
        specialPrice: '',
      },
      {
        title: '\n    AVX DB1 Dual bojleres kávégép + OPV 9 BAR\n    ',
        oldPrice: '',
        currentPrice: '219.990 Ft',
        specialPrice: '',
      },
      {
        title:
          '\n    AVX DB1 Dual bojleres kávégép + OPV 9 BAR + AVX EG001 Elektromos őrlő -Akció!\n    ',
        oldPrice: '319.980 Ft',
        currentPrice: '',
        specialPrice: '289.990 Ft',
      },
      {
        title:
          '\n    AVX DB1 Dual bojleres kávégép + Kingrinder K4 kéziőrlő\n    ',
        oldPrice: '249.980 Ft',
        currentPrice: '',
        specialPrice: '229.990 Ft',
      },
      {
        title: '\n    AVX DB1-TB1 egyes kifolyó G.M16  h.45mm\n    ',
        oldPrice: '',
        currentPrice: '2.990 Ft',
        specialPrice: '',
      },
    ];
    //const machines = await fetchMachines(urls);
    console.log(machines);
    processMachines(machines);
    writeToFile(machines);
    res.json(machines);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error.');
  }
});

module.exports = router;
