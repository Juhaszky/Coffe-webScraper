const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/fetch-data', dataController.fetchMachines);

module.exports = router;
