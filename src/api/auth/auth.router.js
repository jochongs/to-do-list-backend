const { Router } = require('express');
const wrapper = require('../../common/module/wrapper');
const { authController } = require('../index.controller');

const authRouter = Router();

authRouter.post('/', wrapper(authController.login));

module.exports = authRouter;
