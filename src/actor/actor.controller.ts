import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorDTO } from './actor.dto';

@Controller('/api/rest/actor')
export class ActorController {
    constructor(private actorService:ActorService){}

    @Get()
    getActors():Promise<ActorDTO[]>{
        return this.actorService.get();
    }

    @Get(":id")
    getActorById(@Param("id") id:string):Promise<ActorDTO>{
        return this.actorService.getByID(id);
    }

    @Post()
    async createActor(@Body(new ValidationPipe()) actor:ActorDTO):Promise<ActorDTO>{
        return await this.actorService.create(actor);
    }

    @Put(":id")
    updateActor(@Param("id") id:string, @Body(new ValidationPipe()) actor:Partial<ActorDTO>):Promise<ActorDTO>{
        return this.actorService.update(id, actor);
    }

    @Delete(":id")
    deleteActor(@Param("id") id:string):Promise<ActorDTO>{
        return this.actorService.delete(id);
    }
}
