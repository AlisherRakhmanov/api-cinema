import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { generateSlug } from 'src/utils/generate-slug';
import { ActorSelect } from './actor.select';
import { ActorFilterDto } from './dto/actor-filter.dto';
import { ActorDto } from './dto/actor.dto';

@Injectable()
export class ActorService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(dto: ActorFilterDto) {
		const ActorFilterSearch: Prisma.ActorWhereInput = dto.searchTerm
			? {
					OR: [
						{
							name: {
								contains: dto.searchTerm,
								mode: 'insensitive'
							}
						}
					]
			  }
			: {};

		const { perPage, skip } = this.paginationService.getPagination(dto);

		return {
			products: await this.prisma.actor.findMany({
				where: ActorFilterSearch,
				select: ActorSelect,
				skip,
				take: perPage
			}),
			length: await this.prisma.actor.count({ where: ActorFilterSearch })
		};
	}

	async getBySlug(slug: string) {
		const actor = await this.prisma.actor.findUnique({
			where: {
				slug
			},
			select: ActorSelect
		});

		if (!actor) throw new NotFoundException('Жанр не найден!');

		return actor;
	}

	//Admin place
	async getById(id: number) {
		const actor = await this.prisma.actor.findUnique({
			where: {
				id
			},
			select: ActorSelect
		});

		if (!actor) throw new NotFoundException('Жанр не найден!');

		return actor;
	}

	async create(dto: ActorDto) {
		return await this.prisma.actor.create({
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			},
			select: ActorSelect
		});
	}

	async update(id: number, dto: ActorDto) {
		const actor = await this.getById(id);

		return await this.prisma.actor.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			},
			select: ActorSelect
		});
	}

	async getCount() {
		return await this.prisma.actor.count();
	}

	async delete(id: number) {
		const actor = await this.prisma.actor.delete({
			where: {
				id
			},
			select: ActorSelect
		});
	}
}
