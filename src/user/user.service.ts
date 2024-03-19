import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { UserFilterDto } from './dto/user-filter.dto';
import { UserDot } from './dto/user.dto';
import { UserSelect } from './user.select';

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getById(id: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			select: UserSelect
		});

		if (!user) throw new NotFoundException('Пользователь не найден!');

		return user;
	}

	async getByEmail(email: string) {
		return await this.prisma.user.findUnique({
			where: {
				email
			}
		});
	}

	async create(dto: AuthDto) {
		return await this.prisma.user.create({
			data: {
				email: dto.email,
				password: await hash(dto.password)
			},
			select: UserSelect
		});
	}

	async update(id: number, dto: UserDot) {
		const user = await this.getById(id);
		const isSameUser = await this.getByEmail(dto.email);

		if (isSameUser && isSameUser.id === id)
			throw new BadRequestException('Email занят!');

		return await this.prisma.user.update({
			where: {
				id
			},
			data: {
				email: dto.email,
				password: dto.password ? await hash(dto.password) : user.password,
				isAdmin: user.isAdmin ? dto.isAdmin : false
			},
			select: UserSelect
		});
	}

	//Admin place
	async getAll(dto: UserFilterDto) {
		const UserFilterSearch: Prisma.UserWhereInput = dto.searchTerm
			? {
					OR: [
						{
							email: {
								contains: dto.searchTerm,
								mode: 'insensitive'
							}
						}
					]
			  }
			: {};

		const { perPage, skip } = this.paginationService.getPagination(dto);

		return {
			products: await this.prisma.user.findMany({
				where: UserFilterSearch,
				select: UserSelect,
				skip,
				take: perPage
			}),
			length: await this.prisma.user.count({ where: UserFilterSearch })
		};
	}

	async getCount() {
		return await this.prisma.user.count();
	}

	async delete(id: number) {
		const user = await this.prisma.user.delete({
			where: {
				id
			},
			select: UserSelect
		});
	}
}
