import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { DeleteResult} from "typeorm";
import { AccountsService } from "../services/accounts.service";

@Controller('/accounts')
export class AccountsController{
    constructor(
        private readonly service : AccountsService
    ){}
}