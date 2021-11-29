import { HttpResponse } from "../protocols/http";
export const bagRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})