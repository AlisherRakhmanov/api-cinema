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
import { DirectorService } from './director.service';
import { DirectorFilterDto } from './dto/director-filter.dto';
import { DirectorDto } from './dto/director.dto';

@Controller('directors')
export class DirectorController {
	constructor(private readonly directorService: DirectorService) {}

	@Get()
	getAll(@Query() dto: DirectorFilterDto) {
		return this.directorService.getAll(dto);
	}

	@Get('by-slug/:slug')
	getDirectorBySlug(@Param('slug') slug: string) {
		return this.directorService.getBySlug(slug);
	}

	//Admin place

	@Auth('admin')
	@Get(':id')
	getDirector(@Param('id') id: string) {
		return this.directorService.getById(+id);
	}

	@Auth('admin')
	@UsePipes(new ValidationPipe())
	@Post()
	create(@Body() dto: DirectorDto) {
		return this.directorService.create(dto);
	}

	@Auth('admin')
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	updateDirector(@Param('id') id: string, @Body() dto: DirectorDto) {
		return this.directorService.update(+id, dto);
	}

	@Auth('admin')
	@Delete(':id')
	deleteDirector(@Param('id') id: string) {
		return this.directorService.delete(+id);
	}
}
