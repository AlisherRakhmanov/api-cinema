import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { UserDot } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Get('profile')
	profile(@CurrentUser('id') id: number) {
		return this.userService.getById(id);
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Patch('profile')
	updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDot) {
		return this.userService.update(id, dto);
	}

	//Admin place
	@Auth('admin')
	@Get(':id')
	getUser(@Param('id') id: string) {
		return this.userService.getById(+id);
	}

	@Auth('admin')
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	updateUser(@Param('id') id: string, @Body() dto: UserDot) {
		return this.userService.update(+id, dto);
	}
}
