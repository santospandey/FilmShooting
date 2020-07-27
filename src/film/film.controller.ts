import { Controller, Get, Post, Param, Body, Put, Delete, Query, ValidationPipe } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmDTO } from './dto/film.dto';
import { FilmResponse } from './dto/filmResponse.dto';

@Controller('api/rest/film')
export class FilmController {
    constructor(private filmService:FilmService){}

    @Get()
    getFilms(@Query("title") title:string):Promise<FilmResponse[]>{
        return this.filmService.get(title);
    }

    @Get(":id")
    getFilmByID(@Param("id") id:string): Promise<FilmResponse>{
        return this.filmService.getByID(id);
    }

    @Post()
    createFilm(@Body(new ValidationPipe()) film: FilmDTO): Promise<FilmResponse>{
        return this.filmService.create(film);
    }

    @Put(":id")
    updateFilm(@Param("id") id:string, @Body(new ValidationPipe()) film:FilmDTO):Promise<FilmResponse>{
        return this.filmService.update(id, film);
    }

    @Delete(":id")
    deleteFilm(@Param("id") id:string): Promise<FilmResponse>{
        return this.filmService.delete(id);
    }
}
