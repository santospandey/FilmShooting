import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DistributorCompEntity } from './distributor-comp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DistributorCompDTO } from './distributor-comp.dto';

@Injectable()
export class DistributorCompService {
    constructor(
        @InjectRepository(DistributorCompEntity)
        private prodCompRepository:Repository<DistributorCompEntity>){}
    
    async get():Promise<DistributorCompDTO[]>{
        return await this.prodCompRepository.find();
    }

    async getById(id:string):Promise<DistributorCompDTO>{
        return await this.prodCompRepository.findOne(id);
    }

    async create(prodCompData:DistributorCompDTO):Promise<DistributorCompDTO>{
        const distributorComp = new DistributorCompEntity();
        distributorComp.name = prodCompData.name;
        await this.prodCompRepository.save(distributorComp);
        return distributorComp;
    }

    async update(id:string, prodCompData:DistributorCompDTO):Promise<DistributorCompDTO>{
        const prodComp = await this.prodCompRepository.findOne(id);
        if(!prodComp){
            throw new NotFoundException("Distributor Company Not found");
        }
        await this.prodCompRepository.update(id, prodCompData);
        return await this.prodCompRepository.findOne(id);
    }

    async delete(id:string):Promise<DistributorCompDTO>{
        const prodComp = await this.prodCompRepository.findOne(id);
        if(!prodComp){
            throw new NotFoundException("Distributor Company Not found");
        }
        await this.prodCompRepository.delete(id);
        return prodComp;
    }
}
