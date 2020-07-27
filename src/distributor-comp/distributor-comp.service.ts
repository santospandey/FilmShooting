import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DistributorCompEntity } from './distributor-comp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DistributorCompDTO } from './distributor-comp.dto';

@Injectable()
export class DistributorCompService {
    constructor(
        @InjectRepository(DistributorCompEntity)
        private distCompRepository:Repository<DistributorCompEntity>){}
    
    async get():Promise<DistributorCompDTO[]>{
        return await this.distCompRepository.find({ order: { created: "DESC" } });
    }

    async getById(id:string):Promise<DistributorCompDTO>{
        const distributorComp = await this.distCompRepository.findOne(id);
        if(!distributorComp){
            throw new NotFoundException("Distributor Company Not Found");
        }
        return distributorComp;
    }

    async create(distCompData:DistributorCompDTO):Promise<DistributorCompDTO>{
        const distributorComp = new DistributorCompEntity();
        distributorComp.name = distCompData.name;
        await this.distCompRepository.save(distributorComp);
        return distributorComp;
    }

    async update(id:string, distCompData:DistributorCompDTO):Promise<DistributorCompDTO>{
        const distComp = await this.distCompRepository.findOne(id);
        if(!distComp){
            throw new NotFoundException("Distributor Company Not found");
        }
        await this.distCompRepository.update(id, distCompData);
        return await this.distCompRepository.findOne(id);
    }

    async delete(id:string):Promise<DistributorCompDTO>{
        const distComp = await this.distCompRepository.findOne(id);
        if(!distComp){
            throw new NotFoundException("Distributor Company Not found");
        }
        await this.distCompRepository.delete(id);
        return distComp;
    }
}
