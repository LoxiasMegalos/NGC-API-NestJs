import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Accounts } from "src/accounts/entities/accounts.entity";
import { jwtConstants } from "src/auth/shared/constants";
import { Users } from "src/users/entities/users.entity";
import { TransactionsController } from "../controllers/transactions.controller";
import { Transactions } from "../entities/transactions.entity";
import { TransactionsService } from "../services/transactions.service";

@Module({
    imports:[TypeOrmModule.forFeature([Transactions, Users, Accounts]), JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '1d'}
      })],
    providers:[TransactionsService],
    controllers:[TransactionsController],
    exports:[TypeOrmModule] 
}) export class TransactionsModule { }