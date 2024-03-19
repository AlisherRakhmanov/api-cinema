import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GenreFilterDto } from './dto/genre-filter.dto';
import { GenreDto } from './dto/genre.dto';
import { GenreService } from './genre.service';

@Controller('genres')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get()
	getAll(@Query() dto: GenreFilterDto) {
		return this.genreService.getAll(dto);
	}

	@Get('by-slug/:slug')
	getGenreBySlug(@Param('slug') slug: string) {
		return this.genreService.getBySlug(slug);
	}

	//Admin place

	@Auth('admin')
	@Get(':id')
	getGenre(@Param('id') id: string) {
		return this.genreService.getById(+id);
	}

	@Auth('admin')
	@UsePipes(new ValidationPipe())
	@Post()
	create(@Body() dto: GenreDto) {
		return this.genreService.create(dto);
	}

	@Auth('admin')
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	updateGenre(@Param('id') id: string, @Body() dto: GenreDto) {
		return this.genreService.update(+id, dto);
	}

	@Auth('admin')
	@Delete(':id')
	deleteGenre(@Param('id') id: string) {
		return this.genreService.delete(+id);
	}
}
