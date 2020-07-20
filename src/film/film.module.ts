import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from './film.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FilmEntity])],
  controllers: [FilmController],
  providers: [FilmService]
})
export class FilmModule {}
