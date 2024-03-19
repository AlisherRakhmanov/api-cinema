import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';

export class UserFilterDto extends PaginationDto {
	@IsOptional()
	@IsString()
	searchTerm: string;
}
