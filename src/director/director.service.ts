import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DirectorEntity } from './director.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { DirectorDTO } from './director.dto';

@Injectable()
export class DirectorService {
    constructor(
        @InjectRepository(DirectorEntity)
        private directorRepository: Repository<DirectorEntity>) { }

    async getDirectors(): Promise<DirectorDTO[]> {
        return await this.directorRepository.find({ order: { created: "DESC" } });
    }

    async getDirectorById(id: string): Promise<DirectorDTO> {
        const director = await this.directorRepository.findOne(id);
        if(!director){
            throw new NotFoundException("Director Not Found");
        }
        return director;
    }

    async createDirector(director: DirectorDTO): Promise<DirectorDTO> {
        const directorObject = new DirectorEntity();
        directorObject.first_name = director.first_name;
        directorObject.last_name = director.last_name;
        this.directorRepository.save(directorObject);
        return directorObject;
    }

    async update(id: string, directorData: Partial<DirectorDTO>): Promise<DirectorDTO> {        
        const director = await this.directorRepository.findOne(id);
        if (!director) {
            throw new NotFoundException("Director Not Found");
        }
        await this.directorRepository.update(id, directorData);
        return await this.directorRepository.findOne(id);
    }

    async delete(id: string): Promise<DirectorDTO> {        
        const director = await this.directorRepository.findOne(id);
        if (!director) {
            throw new NotFoundException("Director Not Found");
        }
        await this.directorRepository.delete(id);
        return director;
    }
}
