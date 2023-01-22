const express = require('express')
const vehiclesController = require('../controllers/vehiclesController')
const vehiclesRouter = express.Router();

vehiclesRouter.get('/', vehiclesController.allVehicles);

module.exports = vehiclesRouter;