import { AddAccountModel } from "../../domain/usercase/addAccount";
import { AccountModel } from "../../domain/models/account";
export interface AddAccountRepository {
    add(accountData: AddAccountModel): Promise<AccountModel>
}