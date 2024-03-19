import { Module } from '@nestjs/common';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [PaginationModule],
	controllers: [UserController],
	providers: [UserService, PrismaService, PaginationService],
	exports: [UserService]
})
export class UserModule {}
