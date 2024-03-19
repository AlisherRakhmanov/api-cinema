import {
	CanActivate,
	ExecutionContext,
	ForbiddenException
} from '@nestjs/common';
import { User } from '@prisma/client';

export class AdminGuard implements CanActivate {
	canActivate(ctx: ExecutionContext): boolean {
		const { user } = ctx.switchToHttp().getRequest<{ user: User }>();

		if (!user.isAdmin) throw new ForbiddenException('У вас нет прав!');

		return user.isAdmin;
	}
}
