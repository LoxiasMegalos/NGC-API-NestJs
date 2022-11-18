import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccountsService } from "../services/accounts.service";

@ApiTags('Accounts')
@Controller('/accounts')
export class AccountsController{
    constructor(
        private readonly service : AccountsService
    ){}
}