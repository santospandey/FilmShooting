import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, In, Like } from 'typeorm';
import { FilmEntity } from './entity/film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmDTO } from './dto/film.dto';
import { ProductionCompEntity } from '../production-comp/production-comp.entity';
import { DistributorCompEntity } from '../distributor-comp/distributor-comp.entity';
import { ActorEntity } from '../actor/actor.entity';
import { WriterEntity } from '../writer/writer.entity';
import { DirectorEntity } from '../director/director.entity';
import { FilmResponse } from './dto/filmResponse.dto';
import { LocationEntity } from '../location/location.entity';

@Injectable()
export class FilmService {
    static relationTables = ["productionCompany", "distributorCompany", "directors", "writers", "actors", "locations"];
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
        return await this.filmRepository.find({
            relations: FilmService.relationTables,
            where: { title: Like(`%${query}%`) },
            order: { created: "DESC" }
        });
    }

    async getByID(id: string): Promise<FilmResponse> {
        const film = await this.filmRepository.findOne(id, { relations: FilmService.relationTables });
        if (!film) {
            throw new NotFoundException("Film Not Found");
        }
        return film;
    }

    async create(filmData: FilmDTO): Promise<FilmResponse> {
        const film = new FilmEntity();
        try {
            const { title, release_date, productionCompanyId, distributorCompanyId, actorsId, writersId, directorsId, locationsId } = filmData;
            if (title) {
                film.title = title;
            }
            if (release_date) {
                film.release_date = new Date(release_date);
            }
            if (productionCompanyId) {
                film.productionCompany = await this.productionRepository.findOne({ where: { id: productionCompanyId } });
            }
            if (distributorCompanyId) {
                film.distributorCompany = await this.distributorRepository.findOne({ where: { id: distributorCompanyId } });
            }
            if (actorsId) {
                film.actors = await this.actorRepository.find({ id: In(actorsId) });
            }
            if (writersId) {
                film.writers = await this.writerRepository.find({ id: In(writersId) });
            }
            if (directorsId) {
                film.directors = await this.directorRepository.find({ id: In(directorsId) });
            }
            if (locationsId) {
                film.locations = await this.locationRepository.find({ id: In(locationsId) });
            }
        }
        catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        await this.filmRepository.save(film);
        return film;
    }


    async update(id: string, filmData: Partial<FilmDTO>): Promise<FilmResponse> {
        const film = await this.filmRepository.findOne(id);
        if (!film) {
            throw new NotFoundException("Film Not found");
        }

        try {
            const { title, release_date, productionCompanyId, distributorCompanyId, actorsId, writersId, directorsId, locationsId } = filmData;
            if (title) {
                film.title = title;
            }
            if (release_date) {
                film.release_date = new Date(release_date);
            }
            if (productionCompanyId) {
                film.productionCompany = await this.productionRepository.findOne({ where: { id: productionCompanyId } });
            }
            if (distributorCompanyId) {
                film.distributorCompany = await this.distributorRepository.findOne({ where: { id: distributorCompanyId } });
            }
            if (actorsId) {
                film.actors = await this.actorRepository.find({ id: In(actorsId) });
            }
            if (writersId) {
                film.writers = await this.writerRepository.find({ id: In(writersId) });
            }
            if (directorsId) {
                film.directors = await this.directorRepository.find({ id: In(directorsId) });
            }
            if (locationsId) {
                film.locations = await this.locationRepository.find({ id: In(locationsId) });
            }
        }
        catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

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
