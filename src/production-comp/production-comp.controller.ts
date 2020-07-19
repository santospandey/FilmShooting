import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { ProductionCompService } from './production-comp.service';
import { ProductionCompDTO } from './production-comp.dto';

@Controller('api/rest/production-company')
export class ProductionCompController {
    constructor(private productionCompService:ProductionCompService){}

    @Get()
    async getProductionComp():Promise<ProductionCompDTO[]>{
        return await this.productionCompService.get();
    }

    @Get(":id")
    async getProductionCompById(@Param("id") id:string):Promise<ProductionCompDTO>{
        return await this.productionCompService.getById(id);
    }

    @Post()
    async createProductionComp(@Body() prodComp:ProductionCompDTO):Promise<ProductionCompDTO>{
        return await this.productionCompService.create(prodComp);
    }

    @Put(":id")
    async updateProductionComp(@Param("id") id:string, @Body() prodComp:ProductionCompDTO):Promise<ProductionCompDTO>{
        return await this.productionCompService.update(id, prodComp);
    }

    @Delete(":id")
    async deleteProductionComp(@Param("id") id:string):Promise<ProductionCompDTO>{
        return await this.productionCompService.delete(id);
    }
}
