import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductionCompEntity } from './production-comp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductionCompDTO } from './production-comp.dto';

@Injectable()
export class ProductionCompService {
    constructor(
        @InjectRepository(ProductionCompEntity)
        private prodCompRepository:Repository<ProductionCompEntity>){}
    
    async get():Promise<ProductionCompDTO[]>{
        return await this.prodCompRepository.find();
    }

    async getById(id:string):Promise<ProductionCompDTO>{
        return await this.prodCompRepository.findOne(id);
    }

    async create(prodCompData:ProductionCompDTO):Promise<ProductionCompDTO>{
        const productionComp = new ProductionCompEntity();
        productionComp.name = prodCompData.name;
        await this.prodCompRepository.save(productionComp);
        return productionComp;
    }

    async update(id:string, prodCompData:ProductionCompDTO):Promise<ProductionCompDTO>{
        const prodComp = await this.prodCompRepository.findOne(id);
        if(!prodComp){
            throw new NotFoundException("Production Company Not found");
        }
        await this.prodCompRepository.update(id, prodCompData);
        return await this.prodCompRepository.findOne(id);
    }

    async delete(id:string):Promise<ProductionCompDTO>{
        const prodComp = await this.prodCompRepository.findOne(id);
        if(!prodComp){
            throw new NotFoundException("Production Company Not found");
        }
        await this.prodCompRepository.delete(id);
        return prodComp;
    }
}
