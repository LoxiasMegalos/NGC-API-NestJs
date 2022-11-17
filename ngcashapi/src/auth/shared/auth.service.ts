import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/services/users.service";
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ){}

    async validaUser(username: string, password: string){

        const user = await this.userService.getUserByUsername(username)
        if(user && bcrypt.compareSync(password, user.senha)){
            const {id, username, senha} = user
            return {id: id, username, senha}
        }

        return null
    }

    async login(user: any){

        const payload = {username: user.username, senha: user.senha}
        return {
            acess_token: this.jwtService.sign(payload)
        }
    }
}