import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtConstants } from "./constants";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExipration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(username: string, password: string): Promise<any> {
        return 'sucess'
    }
}