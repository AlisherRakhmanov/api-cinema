import { IsString } from 'class-validator';

export class DirectorDto {
	@IsString()
	name: string;
}
