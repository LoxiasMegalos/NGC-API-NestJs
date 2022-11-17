import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Max, MaxLength, MinLength } from "class-validator";
import { Accounts } from "src/accounts/entities/accounts.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

@Entity({name: 'users_tb'})
export class Users{

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    @Column({nullable: false, length: 255, unique: true})
    username: string

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(8)
    @Column({nullable: false, length: 255})
    senha: string

    @ApiProperty()
    @OneToOne(() => Accounts, { onDelete: "CASCADE" })
    @JoinColumn()
    accountId: Accounts
}