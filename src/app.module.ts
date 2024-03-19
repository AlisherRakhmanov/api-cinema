import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { PaginationModule } from './pagination/pagination.module';
import { GenreModule } from './genre/genre.module';
import { ActorModule } from './actor/actor.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule, PaginationModule, GenreModule, ActorModule],
	providers: [PrismaService]
})
export class AppModule {}
