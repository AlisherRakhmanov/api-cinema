import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { generateSlug } from 'src/utils/generate-slug';
import { DirectorSelect } from './director.select';
import { DirectorFilterDto } from './dto/director-filter.dto';
import { DirectorDto } from './dto/director.dto';

@Injectable()
export class DirectorService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(dto: DirectorFilterDto) {
		const DirectorFilterSearch: Prisma.DirectorWhereInput = dto.searchTerm
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
			products: await this.prisma.director.findMany({
				where: DirectorFilterSearch,
				select: DirectorSelect,
				skip,
				take: perPage
			}),
			length: await this.prisma.director.count({ where: DirectorFilterSearch })
		};
	}

	async getBySlug(slug: string) {
		const director = await this.prisma.director.findUnique({
			where: {
				slug
			},
			select: DirectorSelect
		});

		if (!director) throw new NotFoundException('Жанр не найден!');

		return director;
	}

	//Admin place
	async getById(id: number) {
		const director = await this.prisma.director.findUnique({
			where: {
				id
			},
			select: DirectorSelect
		});

		if (!director) throw new NotFoundException('Жанр не найден!');

		return director;
	}

	async create(dto: DirectorDto) {
		return await this.prisma.director.create({
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			},
			select: DirectorSelect
		});
	}

	async update(id: number, dto: DirectorDto) {
		const director = await this.getById(id);

		return await this.prisma.director.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			},
			select: DirectorSelect
		});
	}

	async getCount() {
		return await this.prisma.director.count();
	}

	async delete(id: number) {
		const director = await this.prisma.director.delete({
			where: {
				id
			},
			select: DirectorSelect
		});
	}
}
