import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8, { message: 'Пароль не может быть короче 8 символов' })
	password: string;
}
