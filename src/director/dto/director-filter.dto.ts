import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';

export class DirectorFilterDto extends PaginationDto {
	@IsOptional()
	@IsString()
	searchTerm: string;
}
