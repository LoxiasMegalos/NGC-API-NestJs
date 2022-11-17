import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./shared/auth.service";
import { LocalStrategy } from "./shared/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./shared/jwt.strategy";
import { UsersModule } from "src/users/modules/users.module";
import { AuthController } from "./auth.controller";
import { jwtConstants } from "./shared/constants";

@Module({
    imports: [PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '60s'}
    }), UsersModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}