import { Prisma } from '@prisma/client';

export const GenreSelect: Prisma.GenreSelect = {
	id: true,
	createdAt: true,
	name: true,
	slug: true
};
