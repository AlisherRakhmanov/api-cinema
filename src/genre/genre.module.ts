import { Module } from '@nestjs/common';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';

@Module({
	controllers: [GenreController],
	providers: [GenreService, PrismaService, PaginationService]
})
export class GenreModule {}
