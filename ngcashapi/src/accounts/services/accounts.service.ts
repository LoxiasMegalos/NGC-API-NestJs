import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Accounts } from "../entities/accounts.entity";

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Accounts)
        private accountsService : Repository<Accounts>
    ){} 
}