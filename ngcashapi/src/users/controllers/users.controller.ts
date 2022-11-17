import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { AuthService } from "src/auth/shared/auth.service";
import { DeleteResult} from "typeorm";
import { Users } from "../entities/users.entity";
import { CadastroNovoUsuarioDTO } from "../model/cadastronovousuariodto";
import { UsersService } from "../services/users.service";
import { JwtAuthGuard } from "src/auth/shared/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('/users')
export class UsersController{
    
    constructor(
        private readonly service: UsersService,
        //private authService: AuthService
        private jwtService: JwtService
    ){}
    
    /*
    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<Users[]> {
        return this.service.getAll()
    }*/

    //@UseGuards(JwtAuthGuard)
    @Post('/signin')
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() user : CadastroNovoUsuarioDTO): Promise<Users>{
        return this.service.create(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/login')
    @HttpCode(HttpStatus.OK)
    getUser(
        @Body() user : CadastroNovoUsuarioDTO,
        @Res({passthrough: true}) response : Response
    ): Promise<Users>{
        let userBuscado = this.service.getUser(user)

        if(!userBuscado){
            throw new HttpException('Usuario Nao encontrado', HttpStatus.NOT_FOUND)
        }

        const jwt = this.jwtService.signAsync({id: user.id})
        response.cookie('jwt', jwt, {httpOnly: true})
        return userBuscado
    }
}