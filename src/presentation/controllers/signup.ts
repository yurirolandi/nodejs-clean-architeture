import { HttpResponse, HttpRequest } from '../protocols/http';
import { MissingParamsError } from '../erros/missingParamsErros';
import { bagrequest } from "../helpers/httpHelpers"
export class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        if (!httpRequest.body.name) {
            return bagrequest(new MissingParamsError('name'));
        }
        if (!httpRequest.body.email) {
            return bagrequest(new MissingParamsError('email'));
        }
    }
}