import { EmailValidator } from './../protocols/emailValidator';
import { HttpResponse, HttpRequest } from '../protocols/http';
import { Controller } from "../protocols/controller";
import { bagRequest } from "../helpers/httpHelpers";
import { MissingParamsError } from '../erros/missingParamsErros';
import { InvalidParamsError } from '../erros/InvalidParamsError';
export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor (emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    handle(httpRequest: HttpRequest): HttpResponse {
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
    }
}