import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transactions } from "../entities/transactions.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Transactions])],
    providers:[],
    controllers:[],
    exports:[TypeOrmModule] 
}) export class TransactionsModule { }