
export class InvalidParamsError extends Error {
    constructor(paramName: String) {
        super(`Invalid param: ${paramName}`);
        this.name = 'InvalidParamsError'
    }
}
