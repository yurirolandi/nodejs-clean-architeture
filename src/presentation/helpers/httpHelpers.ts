import { ServerError } from "../erros/ServerError";
import { HttpResponse } from "../protocols/http";
export const bagRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const serverError = (): HttpResponse => ({
    statusCode: 500,
    body: new ServerError()
})

export const successRequest = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})