import { Controller, Get, Post, Param, Body, Put, Delete, Query, ValidationPipe } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmDTO } from './dto/film.dto';
import { FilmResponse } from './dto/filmResponse.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiBody } from "@nestjs/swagger";

@Controller('api/rest/film')
export class FilmController {
    constructor(private filmService: FilmService) { }

    @Get()
    @ApiOkResponse({
        description: "Get all films"
    })
    getFilms(@Query() query): Promise<FilmResponse[]> {
        const { title } = query;
        return this.filmService.get(title);
    }

    @Get(":id")
    @ApiOkResponse({
        description: "Get indivisual film by it's id"
    })
    getFilmByID(@Param("id") id: string): Promise<FilmResponse> {
        return this.filmService.getByID(id);
    }

    @Post()
    @ApiCreatedResponse({
        description: "Create Film"
    })
    @ApiBody({
        type: FilmDTO
    })
    createFilm(@Body(new ValidationPipe()) film: FilmDTO): Promise<FilmResponse> {
        return this.filmService.create(film);
    }

    @Put(":id")
    @ApiOkResponse({
        description: "Update Film"
    })
    @ApiBody({
        type: FilmDTO
    })
    updateFilm(@Param("id") id: string, @Body(new ValidationPipe()) film: FilmDTO): Promise<FilmResponse> {
        return this.filmService.update(id, film);
    }

    @Delete(":id")
    @ApiOkResponse({
        description: "Delete Film"
    })
    deleteFilm(@Param("id") id: string): Promise<FilmResponse> {
        return this.filmService.delete(id);
    }
}
