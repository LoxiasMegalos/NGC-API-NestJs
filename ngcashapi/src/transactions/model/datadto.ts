import { IsNotEmpty, MaxLength, MinLength } from "class-validator"
export class DataDTO{

    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    databuscada: string

}