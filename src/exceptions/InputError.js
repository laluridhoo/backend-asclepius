const ClientError = require("../exceptions/ClientError");

class InputError extends ClientError {
    constructor(message) {
        super(message); // `statusCode` sudah diwariskan dari ClientError
        this.name = 'InputError';
    }
}

module.exports = InputError;

