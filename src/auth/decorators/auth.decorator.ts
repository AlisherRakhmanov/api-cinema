import { UseGuards, applyDecorators } from '@nestjs/common';
import { TypeRole } from '../auth.interface';
import { AdminGuard } from '../guards/admin.guard';
import { JwtGuard } from '../guards/jwt.guard';

export const Auth = (role: TypeRole = 'user') =>
	applyDecorators(
		role === 'admin' ? UseGuards(JwtGuard, AdminGuard) : UseGuards(JwtGuard)
	);
