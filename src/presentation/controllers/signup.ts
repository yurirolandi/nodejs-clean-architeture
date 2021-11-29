import { EmailValidator, Controller, HttpResponse, HttpRequest } from './../protocols';
import { bagRequest, serverError } from "../helpers/httpHelpers";
import { MissingParamsError, InvalidParamsError } from '../erros';
export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    handle(httpRequest: HttpRequest): HttpResponse {
        try {
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return bagRequest(new MissingParamsError(field));
                }
            }
            const isValid = this.emailValidator.isValid(httpRequest.body.email);
            if (!isValid) {
                return bagRequest(new InvalidParamsError('email'));
            }
        } catch (error) {
            return serverError()
        }
    }
}