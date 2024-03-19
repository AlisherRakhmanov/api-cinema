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
import { ActorService } from './actor.service';
import { ActorFilterDto } from './dto/actor-filter.dto';
import { ActorDto } from './dto/actor.dto';

@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Get()
	getAll(@Query() dto: ActorFilterDto) {
		return this.actorService.getAll(dto);
	}

	@Get('by-slug/:slug')
	getActorBySlug(@Param('slug') slug: string) {
		return this.actorService.getBySlug(slug);
	}

	//Admin place

	@Auth('admin')
	@Get(':id')
	getActor(@Param('id') id: string) {
		return this.actorService.getById(+id);
	}

	@Auth('admin')
	@UsePipes(new ValidationPipe())
	@Post()
	create(@Body() dto: ActorDto) {
		return this.actorService.create(dto);
	}

	@Auth('admin')
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	updateActor(@Param('id') id: string, @Body() dto: ActorDto) {
		return this.actorService.update(+id, dto);
	}

	@Auth('admin')
	@Delete(':id')
	deleteActor(@Param('id') id: string) {
		return this.actorService.delete(+id);
	}
}
