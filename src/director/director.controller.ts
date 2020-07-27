import { Controller, Get, Param, Body, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorDTO } from './director.dto';
import { ApiOkResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@Controller('/api/rest/director')
export class DirectorController {
    constructor(private directorService: DirectorService) { }

    @Get()
    @ApiOkResponse({
        description: "Get all directors"
    })
    getDirectors(): Promise<DirectorDTO[]> {
        return this.directorService.getDirectors();
    }

    @Get(":id")
    @ApiOkResponse({
        description: "Get director by id"
    })
    getDirectorById(@Param("id") id: string): Promise<DirectorDTO> {
        return this.directorService.getDirectorById(id);
    }

    @Post()
    @ApiCreatedResponse({
        description:"create director"
    })
    @ApiBody({
        type: DirectorDTO
    })
    createDirector(@Body(new ValidationPipe()) director: DirectorDTO): Promise<DirectorDTO> {
        return this.directorService.createDirector(director);
    }

    @Put(":id")
    @ApiCreatedResponse({
        description: "update director"
    })
    @ApiBody({
        type: DirectorDTO
    })
    update(@Param("id") id: string, @Body(new ValidationPipe()) director: Partial<DirectorDTO>): Promise<DirectorDTO> {
        return this.directorService.update(id, director);
    }

    @Delete(":id")
    @ApiCreatedResponse({
        description: "delete director"
    })    
    delete(@Param("id") id: string) {
        return this.directorService.delete(id);
    }
}
