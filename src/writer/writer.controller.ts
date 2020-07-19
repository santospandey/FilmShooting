import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { WriterService } from './writer.service';
import { WriterDTO } from './writer.dto';

@Controller('api/rest/writer')
export class WriterController {
    constructor(private writerService:WriterService){}

    @Get()
    getWriters():Promise<WriterDTO[]>{
        return this.writerService.get();
    }

    @Get(":id")
    getWriterByID(@Param("id") id:string):Promise<WriterDTO>{
        return this.writerService.getByID(id);
    }

    @Post()
    createWriter(@Body() writer:WriterDTO):Promise<WriterDTO>{
        return this.writerService.create(writer);
    }

    @Put(":id")
    updateWriter(@Param("id") id:string, @Body() writer):Promise<WriterDTO>{
        return this.writerService.update(id, writer);
    }

    @Delete(":id")
    deleteWriter(@Param("id") id:string):Promise<WriterDTO>{
        return this.writerService.delete(id);
    }
}
