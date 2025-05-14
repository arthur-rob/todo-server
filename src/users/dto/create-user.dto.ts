import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsOptional,
    MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }): string => value ?? '')
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
