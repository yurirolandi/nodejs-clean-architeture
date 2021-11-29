import { HttpResponse } from "../protocols/http";
export const bagrequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})