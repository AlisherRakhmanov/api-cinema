import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UserModule
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		PrismaService,
		PaginationService,
		UserService,
		JwtStrategy
	]
})
export class AuthModule {}
