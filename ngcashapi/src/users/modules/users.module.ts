import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Accounts } from "src/accounts/entities/accounts.entity";
import { AuthModule } from "src/auth/auth.module";
import { jwtConstants } from "src/auth/shared/constants";
import { UsersController } from "../controllers/users.controller";
import { Users } from "../entities/users.entity";
import { UsersService } from "../services/users.service";

@Module({
    imports:[TypeOrmModule.forFeature([Users, Accounts]), JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '60s'}
      })],
    providers:[UsersService],
    controllers:[UsersController],
    exports:[TypeOrmModule, UsersService]
}) export class UsersModule{}