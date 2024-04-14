/**
 * @param {import("express").RequestHandler} requestHandler
 */
module.exports = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await requestHandler(req, res, next);
        } catch (err) {
            return next;
        }
    };
};
