import { AddAccountRepository } from "../../../../data/protocols/AddAccountRepository";
import { AddAccountModel } from "../../../../domain/usercase/addAccount"
import { AccountModel } from "../../../../domain/models/account"
import { MongoHelper } from "../helpers/mongoHelpers"

export class AccountMongoRepository implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = MongoHelper.getCollection('accounts')
        const result = await accountCollection.insertOne(accountData)
        return MongoHelper.map(result.ops[0])
    }
}