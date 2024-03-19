import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	register(@Body() dto: AuthDto) {
		return this.authService.register(dto);
	}

	@UsePipes(new ValidationPipe())
	@Post('login')
	login(@Body() dto: AuthDto) {
		return this.authService.login(dto);
	}

	@UsePipes(new ValidationPipe())
	@Post('new-tokens')
	getNewTokens(@Body() dto: RefreshDto) {
		return this.authService.getNewTokens(dto);
	}
}
