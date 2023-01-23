const express = require('express')
const usersController = require('../controllers/usersController')
const usersRouter = express.Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/total', usersController.totalUsers);
usersRouter.get('/vehicles', usersController.numberOfVehicles);
usersRouter.get('/vehicles', usersController.hasVehicleWith);
usersRouter.get('/username/:username', usersController.getUser);
usersRouter.get('/country/:country', usersController.usersFrom);
usersRouter.get('/food/:food', usersController.favoriteFoodIs);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/:username', usersController.updateUser);
usersRouter.put('/:username/vehicles', usersController.addVehicles);
usersRouter.put('/:username/foods', usersController.addFoods);
usersRouter.put('/:username/hide', usersController.hideUser);

module.exports = usersRouter;










