import {
	IsBoolean,
	IsEmail,
	IsOptional,
	IsString,
	MinLength
} from 'class-validator';

export class UserDot {
	@IsEmail()
	email: string;

	@IsOptional()
	@IsString()
	@MinLength(8, { message: 'Пароль не может быть короче 8 символов' })
	password: string;

	@IsOptional()
	@IsBoolean()
	isAdmin: boolean;
}
