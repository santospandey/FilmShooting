import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActorEntity } from './actor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorDTO } from './actor.dto';

@Injectable()
export class ActorService {
    constructor(
        @InjectRepository(ActorEntity)
        private actorRepository: Repository<ActorEntity>) { }

    async get(): Promise<ActorDTO[]> {
        return await this.actorRepository.find({ order: { created: "DESC" } });
    }

    async getByID(id: string): Promise<ActorDTO> {
        const actor = await this.actorRepository.findOne(id);
        if(!actor){
            throw new NotFoundException("Actor Not Found");
        }
        return actor;
    }

    async create(actorData: ActorDTO): Promise<ActorDTO> {
        const actor:ActorDTO = {
            first_name: actorData.first_name,
            last_name: actorData.last_name
        };
                
        await this.actorRepository.save(actor);
        return actor;
    }

    async update(id: string, actorData: Partial<ActorDTO>): Promise<ActorDTO> {
        const actor = await this.actorRepository.findOne(id);
        if (!actor) {
            throw new NotFoundException("Actor Not found");
        }
        await this.actorRepository.update(id, actorData);
        return await this.actorRepository.findOne(id);
    }

    async delete(id: string): Promise<ActorDTO> {
        const actor = await this.actorRepository.findOne(id);
        if (!actor) {
            throw new NotFoundException("Actor Not found");
        }
        await this.actorRepository.delete(id);
        return actor;
    }
}
