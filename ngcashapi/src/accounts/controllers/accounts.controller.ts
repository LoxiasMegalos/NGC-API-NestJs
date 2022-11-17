import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DeleteResult} from "typeorm";
import { AccountsService } from "../services/accounts.service";

@ApiTags('Accounts')
@Controller('/accounts')
export class AccountsController{
    constructor(
        private readonly service : AccountsService
    ){}
}