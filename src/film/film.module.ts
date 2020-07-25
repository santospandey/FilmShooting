import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from './film.entity';
import { DistributorCompEntity } from 'src/distributor-comp/distributor-comp.entity';
import { ProductionCompEntity } from 'src/production-comp/production-comp.entity';
import { ActorEntity } from 'src/actor/actor.entity';
import { WriterEntity } from 'src/writer/writer.entity';
import { DirectorEntity } from 'src/director/director.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([FilmEntity]),
    TypeOrmModule.forFeature([DistributorCompEntity]),
    TypeOrmModule.forFeature([ProductionCompEntity]),
    TypeOrmModule.forFeature([ActorEntity]),
    TypeOrmModule.forFeature([WriterEntity]),
    TypeOrmModule.forFeature([DirectorEntity])
  ],
  controllers: [FilmController],
  providers: [FilmService]
})
export class FilmModule {}
