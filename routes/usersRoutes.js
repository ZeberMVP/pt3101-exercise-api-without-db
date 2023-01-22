const express = require('express')
const usersController = require('../controllers/usersController')
const usersRouter = express.Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:username', usersController.getUser);
usersRouter.get('/total', usersController.totalUsers);
usersRouter.get('/:country', usersController.usersFrom);
usersRouter.get('/vehicles', usersController.numberOfVehicles);
usersRouter.get('/:food', usersController.favoriteFoodIs);
usersRouter.get('/vehicles', usersController.hasVehicleWith);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/:username', usersController.updateUser);
usersRouter.put('/:username/vehicles', usersController.addVehicles);
usersRouter.put('/:username/foods', usersController.addFoods);
usersRouter.put('/:username/hide', usersController.hideUser);

module.exports = usersRouter;










