import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { UserFilterDto } from './dto/user-filter.dto';
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
	@Get()
	getAll(@Query() dto: UserFilterDto) {
		return this.userService.getAll(dto);
	}

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

	@Auth('admin')
	@Delete(':id')
	deleteUser(@Param('id') id: string) {
		return this.userService.delete(+id);
	}
}
