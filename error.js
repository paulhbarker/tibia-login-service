module.exports = class LoginError {
    constructor(message) {
        this.code = 3;
        this.message = message;
    }

    json() {
        return {
            errorCode: this.code,
            errorMessage: this.message
        }
    }
}
