import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcryptAdapter";

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise(resolve => resolve('any_value'))
    }
}))

const salt = 12;
const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt)
}

describe('bcrypt Adapter', () => {
    test('Should call bcrypt with correct values', async () => {
        const sut = makeSut()
        const hasSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(hasSpy).toHaveBeenCalledWith('any_value', salt)
    });
    test('Should return a hash on success', async () => {
        const sut = makeSut()
        const hash = await sut.encrypt('any_value')
        expect(hash).toBe('any_value')
    });
    test('Should throw if bcrypt throws', async () => {
        const sut = makeSut()
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(
            () => {
              throw new Error()
            }
          )
        const promise = sut.encrypt('any_value')
        expect(promise).rejects.toThrow()
    });
});