import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, In, Like } from 'typeorm';
import { FilmEntity } from './film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmDTO } from './dto/film.dto';
import { ProductionCompEntity } from 'src/production-comp/production-comp.entity';
import { DistributorCompEntity } from 'src/distributor-comp/distributor-comp.entity';
import { ActorEntity } from 'src/actor/actor.entity';
import { WriterEntity } from 'src/writer/writer.entity';
import { DirectorEntity } from 'src/director/director.entity';
import { FilmResponse } from './dto/filmResponse.dto';

@Injectable()
export class FilmService {
    constructor(
        @InjectRepository(FilmEntity)
        private filmRepository: Repository<FilmEntity>,

        @InjectRepository(ProductionCompEntity)
        private productionRepository: Repository<ProductionCompEntity>,

        @InjectRepository(DistributorCompEntity)
        private distributorRepository: Repository<DistributorCompEntity>,

        @InjectRepository(ActorEntity)
        private actorRepository: Repository<ActorEntity>,

        @InjectRepository(WriterEntity)
        private writerRepository: Repository<WriterEntity>,

        @InjectRepository(DirectorEntity)
        private directorRepository: Repository<DirectorEntity>
    ) { }

    async get(title:string): Promise<FilmResponse[]> {
        return await this.filmRepository.find({ relations: ["productionCompany", "distributorCompany", "directors", "writers", "actors"], where: {title: Like(title)} });
    }

    async getByID(id: string):Promise<FilmResponse> {
        return await this.filmRepository.findOne(id, { relations: ["productionCompany", "distributorCompany", "directors", "writers", "actors"] });
    }

    async create(filmData: FilmDTO):Promise<FilmResponse> {
        const film = new FilmEntity();
        film.title = filmData.title;
        film.release_date = new Date(filmData.release_date);

        const prodCompId: string = filmData.productionCompanyId;
        const distCompId: string = filmData.distributorCompanyId;
        const actorsId: string[] = filmData.actorsId;
        const writersId: string[] = filmData.writersId;
        const directorsId: string[] = filmData.directorsId;

        const prodCompany = await this.productionRepository.findOne({ where: { id: prodCompId } });
        const distCompany = await this.distributorRepository.findOne({ where: { id: distCompId } });
        const actors = await this.actorRepository.find({id: In(actorsId)});
        const writers = await this.writerRepository.find({id: In(writersId) });
        const directors = await this.directorRepository.find({id: In(directorsId) });

        film.productionCompany = prodCompany;
        film.distributorCompany = distCompany;
        film.actors = actors;
        film.writers = writers;
        film.directors = directors;

        this.filmRepository.save(film);
        return film;
    }

    async update(id: string, filmData: Partial<FilmDTO>): Promise<FilmResponse> {
        const film = await this.filmRepository.findOne(id);
        if (!film) {
            throw new NotFoundException("Film Not found");
        }

        const prodCompId: string = filmData.productionCompanyId;
        const distCompId: string = filmData.distributorCompanyId;
        const actorsId: string[] = filmData.actorsId;
        const writersId: string[] = filmData.writersId;
        const directorsId: string[] = filmData.directorsId;

        const prodCompany = await this.productionRepository.findOne({ where: { id: prodCompId } });
        const distCompany = await this.distributorRepository.findOne({ where: { id: distCompId } });
        const actors = await this.actorRepository.find({id: In(actorsId)});
        const writers = await this.writerRepository.find({id: In(writersId) });
        const directors = await this.directorRepository.find({id: In(directorsId) });

        film.productionCompany = prodCompany;
        film.distributorCompany = distCompany;
        film.actors = actors;
        film.writers = writers;
        film.directors = directors;

        await this.filmRepository.update(id, film);
        return await this.filmRepository.findOne(id);
    }

    async delete(id: string):Promise<FilmResponse> {
        const film = await this.filmRepository.findOne(id);
        if (!film) {
            throw new NotFoundException("Film Not found");
        }
        await this.filmRepository.delete(id);
        return film;
    }
}
