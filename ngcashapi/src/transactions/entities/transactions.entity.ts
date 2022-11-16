import { IsNotEmpty, Max, MaxLength } from "class-validator";
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
    @Column({nullable: false})
    createdAt: Date

    @ManyToOne(() => Accounts, (debitedAccountId) => debitedAccountId.transacoesDebitadas, {
        onDelete: "CASCADE"
    })
    debitedAccountId: Accounts

    @ManyToOne(() => Accounts, (creditedAccountId) => creditedAccountId.transacoesCreditadas, {
        onDelete: "CASCADE"
    })
    creditedAccountId: Accounts
}