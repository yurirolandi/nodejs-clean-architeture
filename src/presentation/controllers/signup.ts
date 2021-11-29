import { HttpResponse, HttpRequest } from '../protocols/http';
import { MissingParamsError } from '../erros/missingParamsErros';
import { bagrequest } from "../helpers/httpHelpers";
import { Controller } from "../protocols/controller";
export class SignUpController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                return bagrequest(new MissingParamsError(field));
            }
        }
    }
}