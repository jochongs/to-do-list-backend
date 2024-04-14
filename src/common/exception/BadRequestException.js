import Exception from './Exception';

export class BadRequestException extends Exception {
    /**
     * @param {string} message
     * @param {any} err
     */
    constructor(message, err) {
        super(400, message, err);
    }
}
