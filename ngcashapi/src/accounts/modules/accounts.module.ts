import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Accounts } from "../entities/accounts.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Accounts])],
    providers:[],
    controllers:[],
    exports:[TypeOrmModule] 
})export class AccountsModule{}