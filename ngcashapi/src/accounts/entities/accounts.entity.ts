import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Max, MaxLength } from "class-validator";
import { Transactions } from "src/transactions/entities/transactions.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({name: 'accounts_tb'})
export class Accounts{

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({nullable: false})
    balance: number

    @ApiProperty({type: () => Transactions})
    @OneToMany(() => Transactions, (transactionId) => transactionId.debitedAccountId)
    transacoesDebitadas: Transactions[]

    @ApiProperty({type: () => Transactions)
    @OneToMany(() => Transactions, (transactionId) => transactionId.creditedAccountId)
    transacoesCreditadas: Transactions[]
}