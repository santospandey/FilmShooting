import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, In, Like } from 'typeorm';
import { FilmEntity } from './entity/film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmDTO } from './dto/film.dto';
import { ProductionCompEntity } from 'src/production-comp/production-comp.entity';
import { DistributorCompEntity } from '../distributor-comp/distributor-comp.entity';
import { ActorEntity } from '../actor/actor.entity';
import { WriterEntity } from '../writer/writer.entity';
import { DirectorEntity } from '../director/director.entity';
import { FilmResponse } from './dto/filmResponse.dto';
import { LocationEntity } from 'src/location/location.entity';

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
        private directorRepository: Repository<DirectorEntity>,

        @InjectRepository(LocationEntity)
        private locationRepository: Repository<LocationEntity>
    ) { }

    async get(title: string): Promise<FilmResponse[]> {
        const query = title || "";        
        return await this.filmRepository.find({ relations: ["productionCompany", "distributorCompany", "directors", "writers", "actors", "locations"], where: { title: Like(`%${query}%`) } });
    }

    async getByID(id: string): Promise<FilmResponse> {
        return await this.filmRepository.findOne(id, { relations: ["productionCompany", "distributorCompany", "directors", "writers", "actors", "locations"] });
    }

    async create(filmData: FilmDTO): Promise<FilmResponse> {
        const film = new FilmEntity();
        film.title = filmData.title;
        film.release_date = new Date(filmData.release_date);

        const prodCompId: string = filmData.productionCompanyId;
        const distCompId: string = filmData.distributorCompanyId;
        const actorsId: string[] = filmData.actorsId;
        const writersId: string[] = filmData.writersId;
        const directorsId: string[] = filmData.directorsId;
        const locationsId: string[] = filmData.locationsId;

        const prodCompany = await this.productionRepository.findOne({ where: { id: prodCompId } });
        const distCompany = await this.distributorRepository.findOne({ where: { id: distCompId } });
        const actors = await this.actorRepository.find({ id: In(actorsId) });
        const writers = await this.writerRepository.find({ id: In(writersId) });
        const directors = await this.directorRepository.find({ id: In(directorsId) });
        const locations = await this.locationRepository.find({ id: In(locationsId) });

        film.productionCompany = prodCompany;
        film.distributorCompany = distCompany;
        film.actors = actors;
        film.writers = writers;
        film.directors = directors;
        film.locations = locations;

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
        const locationsId: string[] = filmData.locationsId;

        const prodCompany = await this.productionRepository.findOne({ where: { id: prodCompId } });
        const distCompany = await this.distributorRepository.findOne({ where: { id: distCompId } });
        const actors = await this.actorRepository.find({ id: In(actorsId) });
        const writers = await this.writerRepository.find({ id: In(writersId) });
        const directors = await this.directorRepository.find({ id: In(directorsId) });
        const locations = await this.locationRepository.find({ id: In(locationsId) });

        film.productionCompany = prodCompany;
        film.distributorCompany = distCompany;
        film.actors = actors;
        film.writers = writers;
        film.directors = directors;
        film.locations = locations;

        await this.filmRepository.update(id, film);
        return await this.filmRepository.findOne(id);
    }

    async delete(id: string): Promise<FilmResponse> {
        const film = await this.filmRepository.findOne(id);
        if (!film) {
            throw new NotFoundException("Film Not found");
        }
        await this.filmRepository.delete(id);
        return film;
    }
}
