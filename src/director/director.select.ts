import { Prisma } from '@prisma/client';

export const DirectorSelect: Prisma.DirectorSelect = {
	id: true,
	createdAt: true,
	name: true,
	slug: true
};
