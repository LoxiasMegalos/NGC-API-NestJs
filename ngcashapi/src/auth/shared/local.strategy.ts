import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { CadastroNovoUsuarioDTO } from "src/users/model/cadastronovousuariodto";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private authService: AuthService){
        super({
            usernameField: 'username',
            passwordField: 'senha'
        })
    }

    async validate(username: string, senha: string): Promise<any>{
        const user = await this.authService.validaUser(username, senha)
        if(!user){
            throw new UnauthorizedException();
        }
        return user
    }

}