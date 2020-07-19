import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorDTO } from './director.dto';

@Controller('/api/rest/director')
export class DirectorController {
    constructor(private directorService: DirectorService) { }

    @Get()
    getDirectors(): Promise<DirectorDTO[]> {
        return this.directorService.getDirectors();
    }

    @Get(":id")
    getDirectorById(@Param("id") id: string): Promise<DirectorDTO> {
        return this.directorService.getDirectorById(id);
    }

    @Post()
    createDirector(@Body() director: DirectorDTO): Promise<DirectorDTO> {
        return this.directorService.createDirector(director);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() director: DirectorDTO): Promise<DirectorDTO> {
        return this.directorService.update(id, director);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.directorService.delete(id);
    }
}
