import { Controller, Get, Post, Param, Body, Put, Delete, Query } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmDTO } from './dto/film.dto';
import { FilmResponse } from './dto/filmResponse.dto';

@Controller('api/rest/film')
export class FilmController {
    constructor(private filmService:FilmService){}

    @Get()
    async getFilms(@Query("title") title:string):Promise<FilmResponse[]>{
        return await this.filmService.get(title);
    }

    @Get(":id")
    async getFilmByID(@Param("id") id:string): Promise<FilmResponse>{
        return await this.filmService.getByID(id);
    }

    @Post()
    async createFilm(@Body() film: FilmDTO): Promise<FilmResponse>{
        return await this.filmService.create(film);
    }

    @Put(":id")
    async updateFilm(@Param("id") id:string, @Body() film:FilmDTO):Promise<FilmResponse>{
        return await this.filmService.update(id, film);
    }

    @Delete(":id")
    async deleteFilm(@Param("id") id:string): Promise<FilmResponse>{
        return await this.filmService.delete(id);
    }
}
