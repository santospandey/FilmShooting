import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FilmEntity } from './film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmDTO } from './film.dto';

@Injectable()
export class FilmService {
    constructor(
        @InjectRepository(FilmEntity)
        private filmRepository:Repository<FilmEntity>){}

    async get():Promise<FilmDTO[]>{
        return await this.filmRepository.find();
    }

    async getByID(id:string):Promise<FilmDTO>{
        return await this.filmRepository.findOne(id);
    }

    async create(filmData:FilmDTO):Promise<FilmDTO>{
        const film = new FilmEntity();
        film.title = filmData.title;
        film.release_date = new Date(filmData.release_date);

        console.log("actors", film.actors);
        
        this.filmRepository.create(film);
        return film;
    }

    async update(id:string, filmData:Partial<FilmDTO>):Promise<FilmDTO>{
        const film = await this.filmRepository.findOne(id);
        if(!film){
            throw new NotFoundException("Film Not found");
        }        
        await this.filmRepository.update(id, filmData);
        return await this.filmRepository.findOne(id);        
    }

    async delete(id:string):Promise<FilmDTO>{
        const film = await this.filmRepository.findOne(id);
        if(!film){
            throw new NotFoundException("Film Not found");
        }
        await this.filmRepository.delete(id);
        return film;
    }
}
