import { IsBoolean, IsDate, IsInt, IsISBN, IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {
    id: number;
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    author: string;
    @IsNotEmpty()
    @IsISBN()
    isbn: string;
    @IsInt()
    publishYear: number;
    reserved: boolean;
}
