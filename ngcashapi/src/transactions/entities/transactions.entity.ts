

import { IsNotEmpty, Max, MaxLength } from "class-validator";
import moment from "moment";
import { Transform } from 'class-transformer';

import { Accounts } from "src/accounts/entities/accounts.entity";

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'transactions_tb'})
export class Transactions {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({nullable: false})
    value: number

    @IsNotEmpty()
    @Column({nullable: false, type: 'date'})
    createdAt: string

    @ManyToOne(() => Accounts, (debitedAccountId) => debitedAccountId.transacoesDebitadas, {
        onDelete: "CASCADE"
    })
    debitedAccountId: Accounts

    @ManyToOne(() => Accounts, (creditedAccountId) => creditedAccountId.transacoesCreditadas, {
        onDelete: "CASCADE"
    })
    creditedAccountId: Accounts
}