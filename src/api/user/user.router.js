const { Router } = require('express');
const wrapper = require('../../common/module/wrapper');
const { userContorller } = require('../index.controller');

const userRouter = Router();

userRouter.post('/', wrapper(userContorller.signUp));

userRouter.get('/', wrapper(userContorller.getMyInfo));

userRouter.put('/', wrapper(userContorller.updateMyInfo));

userRouter.delete('/', wrapper(userContorller.withdrawal));

module.exports = userRouter;
