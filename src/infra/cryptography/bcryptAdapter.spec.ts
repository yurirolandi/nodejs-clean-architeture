import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcryptAdapter";

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise(resolve => resolve('any_value'))
    }
}))

describe('bcrypt Adapter', () => {
    test('Should call bcrypt with correct values', async () => {
        const salt = 12;
        const sut = new BcryptAdapter(salt)
        const hasSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(hasSpy).toHaveBeenCalledWith('any_value', salt)
    });
    test('Should return a hash on success', async () => {
        const salt = 12;
        const sut = new BcryptAdapter(salt)
        const hash = await sut.encrypt('any_value')
        expect(hash).toBe('any_value')
    });
});