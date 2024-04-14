const express = require('express');
const NotFoundException = require('./common/exception/NotFoundException');
const Exception = require('./common/exception/Exception');
const authRouter = require('./api/auth/auth.router');
const userRouter = require('./api/user/user.router');
const todoRouter = require('./api/todo/todo.rotuer');

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.use((req, res, next) => {
    throw new NotFoundException('API not found');
});

app.use((err, req, res, next) => {
    if (err instanceof Exception) {
        return res.status(err.status).send({
            message: err.message,
        });
    }

    return res.status(500).send({
        message: '예상하지 못한 에러가 발생했습니다.',
    });
});

module.exports = app;
