import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmDTO } from './film.dto';

@Controller('api/rest/film')
export class FilmController {
    constructor(private filmService:FilmService){}

    @Get()
    getFilms():Promise<FilmDTO[]>{
        return this.filmService.get();
    }

    @Get(":id")
    getFilmByID(@Param("id") id:string):Promise<FilmDTO>{
        return this.filmService.getByID(id);
    }

    @Post()
    createFilm(@Body() film):Promise<FilmDTO>{
        return this.filmService.create(film);
    }

    @Put(":id")
    updateFilm(@Param("id") id:string, @Body() film):Promise<FilmDTO>{
        return this.filmService.update(id, film);
    }

    @Delete(":id")
    deleteFilm(@Param("id") id:string):Promise<FilmDTO>{
        return this.filmService.delete(id);
    }
}
