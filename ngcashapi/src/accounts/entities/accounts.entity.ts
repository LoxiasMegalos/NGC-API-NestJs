import { IsNotEmpty, Max, MaxLength } from "class-validator";
import { Transactions } from "src/transactions/entities/transactions.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({name: 'accounts_tb'})
export class Accounts{

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({nullable: false})
    balance: number

    @OneToMany(() => Transactions, (transactionId) => transactionId.debitedAccountId)
    transacoesDebitadas: Transactions[]

    @OneToMany(() => Transactions, (transactionId) => transactionId.creditedAccountId)
    transacoesCreditadas: Transactions[]
}