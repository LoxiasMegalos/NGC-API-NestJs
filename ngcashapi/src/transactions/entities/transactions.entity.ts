

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Max, MaxLength } from "class-validator";


import { Accounts } from "src/accounts/entities/accounts.entity";

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'transactions_tb'})
export class Transactions {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({nullable: false})
    value: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({nullable: false, type: 'date'})
    createdAt: string

    @ApiProperty({type: () => Accounts})
    @ManyToOne(() => Accounts, (debitedAccountId) => debitedAccountId.transacoesDebitadas, {
        onDelete: "CASCADE"
    })
    debitedAccountId: Accounts

    @ApiProperty({type: () => Accounts})
    @ManyToOne(() => Accounts, (creditedAccountId) => creditedAccountId.transacoesCreditadas, {
        onDelete: "CASCADE"
    })
    creditedAccountId: Accounts
}