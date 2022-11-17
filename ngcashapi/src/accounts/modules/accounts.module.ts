import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountsController } from "../controllers/accounts.controller";
import { Accounts } from "../entities/accounts.entity";
import { AccountsService } from "../services/accounts.service";

@Module({
    imports:[TypeOrmModule.forFeature([Accounts])],
    providers:[AccountsService],
    controllers:[AccountsController],
    exports:[TypeOrmModule] 
}) export class AccountsModule{}