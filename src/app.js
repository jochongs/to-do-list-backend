const express = require('express');
const NotFoundException = require('./common/exception/NotFoundException');
const Exception = require('./common/exception/Exception');

const app = express();

app.use(express.json());

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
