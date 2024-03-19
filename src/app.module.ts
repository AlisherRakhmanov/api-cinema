import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActorModule } from './actor/actor.module';
import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';
import { MediaModule } from './media/media.module';
import { PaginationModule } from './pagination/pagination.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		UserModule,
		AuthModule,
		PaginationModule,
		GenreModule,
		ActorModule,
		MediaModule
	],
	providers: [PrismaService]
})
export class AppModule {}
