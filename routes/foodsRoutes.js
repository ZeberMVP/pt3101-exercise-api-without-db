const express = require('express')
const foodsController = require('../controllers/foodsController')
const foodsRouter = express.Router();

foodsRouter.get('/', foodsController.allFoods);

module.exports = foodsRouter;