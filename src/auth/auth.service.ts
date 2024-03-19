import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { verify } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto);

		return await this.generateAuthResponse(user);
	}

	async register(dto: AuthDto) {
		const isExists = await this.userService.getByEmail(dto.email);
		if (isExists) throw new BadRequestException('Email занят!');

		const user = await this.userService.create(dto);

		return await this.generateAuthResponse(user);
	}

	async getNewTokens(dto: RefreshDto) {
		try {
			const result = await this.jwtService.verifyAsync(dto.refreshToken);
			const user = await this.userService.getById(result.id);

			return await this.generateAuthResponse(user);
		} catch (error) {
			return error;
		}
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email);
		const isValidPassword = await verify(user.password, dto.password);

		if (!user || !isValidPassword)
			throw new BadRequestException('Неверный email или пароль!');

		return user;
	}

	private async issueTokens(id: number) {
		const data = { id };

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '1h'
		});
		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '1d'
		});

		return {
			accessToken,
			refreshToken
		};
	}

	private async generateAuthResponse(user: Partial<User>) {
		const tokens = await this.issueTokens(user.id);

		return {
			user: this.getUserInfo(user),
			...tokens
		};
	}

	private getUserInfo(user: Partial<User>) {
		return {
			id: user.id,
			email: user.email,
			isAdmin: user.isAdmin
		};
	}
}
