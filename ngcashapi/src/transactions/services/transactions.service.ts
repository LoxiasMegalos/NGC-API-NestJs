import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/entities/users.entity";
import { DeleteResult, ILike, Repository, Like } from "typeorm";
import { Transactions } from "../entities/transactions.entity";
import { TransacaoDTO } from "../model/transacaodto";
import * as moment from 'moment';
import { DataDTO } from "../model/datadto";
import { Accounts } from "src/accounts/entities/accounts.entity";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transactions)
        private transactionRepository: Repository<Transactions>,

        @InjectRepository(Users)
        private userRepository: Repository<Users>,

        @InjectRepository(Accounts)
        private accountsRepository: Repository<Accounts>
    ){}

    async getTransacoesCashOut(idProcurado : number): Promise<Transactions[]>{
        let contaBuscada = await this.userRepository.findOne({
            where: {
                accountId : {
                    id : idProcurado
                }
            }, 
            relations : {
                accountId : {
                    transacoesCreditadas : true,
                    transacoesDebitadas : true
                }
            }
        })

        return contaBuscada.accountId.transacoesDebitadas
    }

    async getTransacoesCashIn(idProcurado : number): Promise<Transactions[]>{
        let contaBuscada = await this.userRepository.findOne({
            where: {
                accountId : {
                    id : idProcurado
                }
            }, 
            relations : {
                accountId : {
                    transacoesCreditadas : true,
                    transacoesDebitadas : true
                }
            }
        })

        return contaBuscada.accountId.transacoesCreditadas
    }

    async getTransacoesPorData(data : DataDTO): Promise<Transactions[]>{
        //return this.transactionRepository.find({
        //    where: {
        //        createdAt : data.databuscada
        //   }
        //})

        let contaBuscada = await this.userRepository.findOne({
            where: {
                accountId : {
                    id : data.id
                }
            }, 
            relations : {
                accountId : {
                    transacoesCreditadas : true,
                    transacoesDebitadas : true
                }
            }
        })

        

        return this.transactionRepository.find({
            where: [
                {createdAt : data.databuscada,
                creditedAccountId : {
                    id : contaBuscada.accountId.id
                }},
                {debitedAccountId : {
                    id : contaBuscada.accountId.id
                },
                createdAt : data.databuscada
            }
            ]
        })

        /*
        

        for(let i = 0; i < transacoesDoDia.length; i++){
            if(transacoesDoDia[i].id in contaBuscada.accountId.transacoesCreditadas || transacoesDoDia[i].id in contaBuscada.accountId.transacoesDebitadas){
                transacoes.push(transacoesDoDia[i])
            }
        }

        /*
        

        for(const element of contaBuscada.accountId.transacoesCreditadas){
            if(element.createdAt == data.databuscada){
                transacoes.push(element)
            }
        } 

        for(const element of contaBuscada.accountId.transacoesDebitadas){
            if(element.createdAt == data.databuscada){
                transacoes.push(element)
            }
        }
        
        return transacoes
        */
    }

    async getTransacoesParticipadas(idProcurado : number): Promise<Transactions[]>{

        let contaBuscada = await this.transactionRepository.find({
            where: [
                {debitedAccountId : {
                    id : idProcurado
                }},{creditedAccountId : {
                    id : idProcurado
                }} 
            ], relations : {
                debitedAccountId : true,
                creditedAccountId : true
            } 
        })

        return contaBuscada
    }

    async realizaTransacao(transacao : TransacaoDTO): Promise<Transactions> {

        if(transacao.usernameReceptor == transacao.usernameLogado){
            throw new HttpException('Não pode transferir para si mesmo!', HttpStatus.NOT_ACCEPTABLE)
        }

        let cadastroLogin = await this.userRepository.findOne({
            where : {
                username : transacao.usernameLogado
            }, relations : {
                accountId : true
            }
        })

        let cadastroReceptor = await this.userRepository.findOne({
            where : {
                username : transacao.usernameReceptor
            }, relations : {
                accountId : true
            }
        })

        if(!cadastroReceptor){
            throw new HttpException('Username não encontrado!', HttpStatus.NOT_FOUND)
        }

        if((cadastroLogin.accountId.balance - transacao.value) < 0){
            throw new HttpException('Fundos Inválidos!', HttpStatus.NOT_FOUND)
        }


        cadastroLogin.accountId.balance -= transacao.value
        this.userRepository.save(cadastroLogin)
        this.accountsRepository.save(cadastroLogin.accountId)
        cadastroReceptor.accountId.balance += transacao.value
        this.userRepository.save(cadastroReceptor)
        this.accountsRepository.save(cadastroReceptor.accountId)

        let transacaoTabela = new Transactions()
        
        let dataAtual = new Date()
        let dataAtualString = dataAtual.getFullYear().toString() + "-" + (dataAtual.getMonth() + 1).toString() + "-" + dataAtual.getDate().toString()

        transacaoTabela.createdAt = dataAtualString
        transacaoTabela.value = transacao.value
        transacaoTabela.debitedAccountId = cadastroLogin.accountId
        transacaoTabela.creditedAccountId = cadastroReceptor.accountId

        return this.transactionRepository.save(transacaoTabela)
    }
}