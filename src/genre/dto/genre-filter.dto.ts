import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';

export class GenreFilterDto extends PaginationDto {
	@IsOptional()
	@IsString()
	searchTerm: string;
}
