import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorDTO } from './actor.dto';
import { ApiOkResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@Controller('/api/rest/actor')
export class ActorController {
    constructor(private actorService:ActorService){}

    @Get()
    @ApiOkResponse({
        description: "Get all actors"
    })
    getActors():Promise<ActorDTO[]>{
        return this.actorService.get();
    }

    @Get(":id")
    @ApiOkResponse({
        description: "Get actor by its id"
    })
    getActorById(@Param("id") id:string):Promise<ActorDTO>{
        return this.actorService.getByID(id);
    }

    @Post()
    @ApiCreatedResponse({
        description: "Create an actor"
    })
    @ApiBody({
        type: ActorDTO
    })
    createActor(@Body(new ValidationPipe()) actor:ActorDTO):Promise<ActorDTO>{
        return this.actorService.create(actor);
    }

    @Put(":id")
    @ApiBody({
        type: ActorDTO
    })
    @ApiOkResponse({
        description: "Update actor"
    })
    updateActor(@Param("id") id:string, @Body(new ValidationPipe()) actor:Partial<ActorDTO>):Promise<ActorDTO>{
        return this.actorService.update(id, actor);
    }

    @Delete(":id")
    @ApiOkResponse({
        description: "Delete actor"
    })
    deleteActor(@Param("id") id:string):Promise<ActorDTO>{
        return this.actorService.delete(id);
    }
}
