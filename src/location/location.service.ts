import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LocationEntity } from './location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationDTO } from './location.dto';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(LocationEntity)
        private locationRepository:Repository<LocationEntity>){}
    
    async get():Promise<LocationDTO[]>{
        return await this.locationRepository.find();
    }

    async getById(id:string):Promise<LocationDTO>{
        return await this.locationRepository.findOne(id);
    }

    async create(locationData:LocationDTO):Promise<LocationDTO>{
        const distributorComp = new LocationEntity();
        distributorComp.name = locationData.name;
        await this.locationRepository.save(distributorComp);
        return distributorComp;
    }

    async update(id:string, locationData:LocationDTO):Promise<LocationDTO>{
        const location = await this.locationRepository.findOne(id);
        if(!location){
            throw new NotFoundException("Distributor Company Not found");
        }
        await this.locationRepository.update(id, locationData);
        return await this.locationRepository.findOne(id);
    }

    async delete(id:string):Promise<LocationDTO>{
        const location = await this.locationRepository.findOne(id);
        if(!location){
            throw new NotFoundException("Distributor Company Not found");
        }
        await this.locationRepository.delete(id);
        return location;
    }
}
