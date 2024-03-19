import { Prisma } from '@prisma/client';

export const UserSelect: Prisma.UserSelect = {
	id: true,
	createdAt: true,
	email: true,
	isAdmin: true,
	password: false
};
