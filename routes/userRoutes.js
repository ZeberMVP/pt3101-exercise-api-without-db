const express = require('express')
const userController = require('../controllers/userController')
const userRouter = express.Router();

userRouter.delete('/:username', userController.deleteUser);

module.exports = userRouter;