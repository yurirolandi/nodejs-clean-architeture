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
            const { email, password, passwordConfirmation  } = httpRequest.body;
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return bagRequest(new MissingParamsError(field));
                }
            }
            if (password !== passwordConfirmation) {
                return bagRequest(new InvalidParamsError('passwordConfirmation'))
            }
            const isValid = this.emailValidator.isValid(email);
            if (!isValid) {
                return bagRequest(new InvalidParamsError('email'));
            }
        } catch (error) {
            return serverError()
        }
    }
}