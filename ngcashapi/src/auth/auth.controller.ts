import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { CadastroNovoUsuarioDTO } from "src/users/model/cadastronovousuariodto";
import { AuthService } from "./shared/auth.service";
import { LocalAuthGuard } from "./shared/local-auth.guard";

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService
    ){}


    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req: any){
        return this.authService.login(req.user)
    }

}