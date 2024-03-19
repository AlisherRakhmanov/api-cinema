import { Prisma } from '@prisma/client';

export const ActorSelect: Prisma.ActorSelect = {
	id: true,
	createdAt: true,
	name: true,
	slug: true
};
