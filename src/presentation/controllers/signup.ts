import { HttpResponse, HttpRequest } from '../protocols/http';
import { MissingParamsError } from '../erros/missingParamsErros';
import { bagrequest } from "../helpers/httpHelpers"
export class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields= ['name', 'email'];
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                return bagrequest(new MissingParamsError(field));
            }
        }
    }
}