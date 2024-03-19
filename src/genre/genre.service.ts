import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { generateSlug } from 'src/utils/generate-slug';
import { GenreFilterDto } from './dto/genre-filter.dto';
import { GenreDto } from './dto/genre.dto';
import { GenreSelect } from './genre.select';

@Injectable()
export class GenreService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(dto: GenreFilterDto) {
		const GenreFilterSearch: Prisma.GenreWhereInput = dto.searchTerm
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
			products: await this.prisma.genre.findMany({
				where: GenreFilterSearch,
				select: GenreSelect,
				skip,
				take: perPage
			}),
			length: await this.prisma.genre.count({ where: GenreFilterSearch })
		};
	}

	async getBySlug(slug: string) {
		const genre = await this.prisma.genre.findUnique({
			where: {
				slug
			},
			select: GenreSelect
		});

		if (!genre) throw new NotFoundException('Жанр не найден!');

		return genre;
	}

	//Admin place
	async getById(id: number) {
		const genre = await this.prisma.genre.findUnique({
			where: {
				id
			},
			select: GenreSelect
		});

		if (!genre) throw new NotFoundException('Жанр не найден!');

		return genre;
	}

	async create(dto: GenreDto) {
		return await this.prisma.genre.create({
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			},
			select: GenreSelect
		});
	}

	async update(id: number, dto: GenreDto) {
		const genre = await this.getById(id);

		return await this.prisma.genre.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			},
			select: GenreSelect
		});
	}

	async getCount() {
		return await this.prisma.genre.count();
	}

	async delete(id: number) {
		const genre = await this.prisma.genre.delete({
			where: {
				id
			},
			select: GenreSelect
		});
	}
}
