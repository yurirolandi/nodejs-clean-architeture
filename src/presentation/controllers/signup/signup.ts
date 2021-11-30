import { EmailValidator, Controller, HttpResponse, HttpRequest, AddAccount } from './signupProtocols';
import { bagRequest, serverError, successRequest } from "../../helpers/httpHelpers";
import { MissingParamsError, InvalidParamsError } from '../../erros';

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }

    handle(httpRequest: HttpRequest): HttpResponse {
        try {
            const { name, email, password, passwordConfirmation } = httpRequest.body;
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
            const account = this.addAccount.add({ name, email, password });

            return successRequest(account)
        } catch (error) {
            return serverError()
        }
    }
}