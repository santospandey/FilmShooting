import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WriterEntity } from './writer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WriterDTO } from './writer.dto';

@Injectable()
export class WriterService {
    constructor(
        @InjectRepository(WriterEntity)
        private writerRepository:Repository<WriterEntity>){}
        
    async get():Promise<WriterDTO[]>{
        return await this.writerRepository.find();
    }

    async getByID(id:string):Promise<WriterDTO>{
        return await this.writerRepository.findOne(id);
    }

    async create(writerData:WriterDTO):Promise<WriterDTO>{
        const writer = new WriterEntity();
        writer.first_name = writerData.first_name;
        writer.last_name = writerData.last_name;
        await this.writerRepository.save(writer);
        return writer;        
    }

    async update(id:string, writerData:WriterDTO):Promise<WriterDTO>{
        const writer = await this.writerRepository.findOne(id);
        if(!writer){
            throw new NotFoundException("Writer Not found");
        }
        await this.writerRepository.update(id, writerData);
        return this.writerRepository.findOne(id);
    }

    async delete(id:string){
        const writer = await this.writerRepository.findOne(id);
        if(!writer){
            throw new NotFoundException("Writer Not found");
        }
        await this.writerRepository.delete(id);
        return writer;
    }
}
