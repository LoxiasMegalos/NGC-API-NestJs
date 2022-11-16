import { IsNotEmpty, Max, MaxLength } from "class-validator";
import { Accounts } from "src/accounts/entities/accounts.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

@Entity({name: 'users_tb'})
export class Users{

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    username: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    senha: string

    @OneToOne(() => Accounts, { onDelete: "CASCADE" })
    @JoinColumn()
    accountId: Accounts
}