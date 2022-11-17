import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Users } from "../entities/users.entity";
import { matches } from "class-validator";
import { Accounts } from "src/accounts/entities/accounts.entity";
import { CadastroNovoUsuarioDTO } from "../model/cadastronovousuariodto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,

        @InjectRepository(Accounts)
        private accountsRepository: Repository<Accounts>
    ){}
    
    async create(user : CadastroNovoUsuarioDTO): Promise<Users> {
        const regex = /[A-Z]|[1-9]/g
        const foundRequisitos = user.senha.match(regex);

        if(foundRequisitos.length >= 2 && user.senha.length >= 8){
            const regexNumeros = /[1-9]/g
            const foundRequisitosNumericos = user.senha.match(regexNumeros);

            if(foundRequisitosNumericos.length == foundRequisitos.length || foundRequisitosNumericos.length == 0){
                throw new HttpException('A senha precisa possuir pelo menos 1 Número e 1 letra Maiúscula', HttpStatus.UNPROCESSABLE_ENTITY)
            } else{

                let novaConta = new Accounts()
                novaConta.balance = 100
                this.accountsRepository.save(novaConta)
                
                const hashPasswordSize = user.senha.length
                const hash = await bcrypt.hash(user.senha,hashPasswordSize)

                let novoUsuario = new Users()
                novoUsuario.username = user.username
                novoUsuario.senha = hash
                novoUsuario.accountId = novaConta

                return this.usersRepository.save(novoUsuario)
            }
        }

        throw new HttpException('A senha precisa possuir pelo menos 1 Número e 1 letra Maiúscula', HttpStatus.BAD_REQUEST)
    }

    async getAll(): Promise<Users[]> {
        return this.usersRepository.find({
            relations : {
                accountId : true
            }
        })
    }

    async getUser(user : CadastroNovoUsuarioDTO): Promise<Users> {
        let userBuscado = await this.usersRepository.findOne({
            where : {
                username : user.username
            },
            relations : {
                accountId : {
                    transacoesDebitadas : true,
                    transacoesCreditadas: true
                }
            },
        })

        if(!userBuscado){
            throw new HttpException('Username não encontrado!', HttpStatus.NOT_FOUND)
        }

        if(bcrypt.compareSync(user.senha, userBuscado.senha)){
            return userBuscado
        } 
        throw new HttpException('Senha Inválida!', HttpStatus.NOT_FOUND)
        
    }

    async getUserByUsername(username: string): Promise<Users> {
        return this.usersRepository.findOne({
            where : {
                username : username
            }
        })
    }
}