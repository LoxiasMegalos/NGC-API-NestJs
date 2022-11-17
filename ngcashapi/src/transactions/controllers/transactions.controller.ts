import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { DeleteResult} from "typeorm";
import { Transactions } from "../entities/transactions.entity";
import { DataDTO } from "../model/datadto";
import { TransacaoDTO } from "../model/transacaodto";
import { TransactionsService } from "../services/transactions.service";
import { JwtAuthGuard } from "src/auth/shared/jwt-auth.guard";

@Controller('/transactions')
export class TransactionsController {
    constructor(
        private readonly service : TransactionsService
    ){}
    
    @UseGuards(JwtAuthGuard)
    @Get('/cashout/:id')
    @HttpCode(HttpStatus.OK)
    findCashOutTransactions(@Param('id', ParseIntPipe) id: number): Promise<Transactions[]> {
        return this.service.getTransacoesCashOut(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/cashin/:id')
    @HttpCode(HttpStatus.OK)
    findCashInTransactions(@Param('id', ParseIntPipe) id: number): Promise<Transactions[]> {
        return this.service.getTransacoesCashIn(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/data/')
    @HttpCode(HttpStatus.OK)
    findDataTransactions(@Body() data: DataDTO): Promise<Transactions[]> {
        return this.service.getTransacoesPorData(data)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findAllTransactions(@Param('id', ParseIntPipe) id: number): Promise<Transactions[]> {
        return this.service.getTransacoesParticipadas(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    realizaTransacao(@Body() transacao : TransacaoDTO): Promise<Transactions> {
        return this.service.realizaTransacao(transacao)
    }
}