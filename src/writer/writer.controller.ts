import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe } from '@nestjs/common';
import { WriterService } from './writer.service';
import { WriterDTO } from './writer.dto';
import { ApiOkResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@Controller('api/rest/writer')
export class WriterController {
    constructor(private writerService:WriterService){}

    @Get()
    @ApiOkResponse({
        description: "get all writers"
    })
    getWriters():Promise<WriterDTO[]>{
        return this.writerService.get();
    }

    @Get(":id")
    @ApiOkResponse({
        description: "get writer by id"
    })
    getWriterByID(@Param("id") id:string):Promise<WriterDTO>{
        return this.writerService.getByID(id);
    }

    @Post()
    @ApiCreatedResponse({
        description: "create writer"
    })
    @ApiBody({
        type: WriterDTO
    })
    createWriter(@Body(new ValidationPipe()) writer:WriterDTO):Promise<WriterDTO>{
        return this.writerService.create(writer);
    }

    @Put(":id")
    @ApiOkResponse({
        description: "update writer"
    })
    @ApiBody({
        type: WriterDTO
    })
    updateWriter(@Param("id") id:string, @Body(new ValidationPipe()) writer:Partial<WriterDTO>):Promise<WriterDTO>{
        return this.writerService.update(id, writer);
    }

    @Delete(":id")
    @ApiOkResponse({
        description: "delete writer"
    })
    deleteWriter(@Param("id") id:string):Promise<WriterDTO>{
        return this.writerService.delete(id);
    }
}
