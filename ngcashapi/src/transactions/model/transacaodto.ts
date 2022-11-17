import { IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class TransacaoDTO{

    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    usernameLogado: string

    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    usernameReceptor: string

    @IsNotEmpty()
    value: number
}