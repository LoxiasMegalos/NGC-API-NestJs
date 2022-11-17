import { IsNotEmpty, Length, MaxLength, MinLength } from "class-validator";

export class CadastroNovoUsuarioDTO{

    id: number

    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    username: string

    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(8)
    senha: string
}