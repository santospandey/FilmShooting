import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { DistributorCompService } from './distributor-comp.service';
import { DistributorCompDTO } from "./distributor-comp.dto";

@Controller('api/rest/distributor-company')
export class DistributorCompController {
    constructor(private distributorCompService:DistributorCompService){}

    @Get()
    async getDistributorComp():Promise<DistributorCompDTO[]>{
        return await this.distributorCompService.get();
    }

    @Get(":id")
    async getDistributorCompById(@Param("id") id:string):Promise<DistributorCompDTO>{
        return await this.distributorCompService.getById(id);
    }

    @Post()
    async createDistributorComp(@Body() prodComp:DistributorCompDTO):Promise<DistributorCompDTO>{
        return await this.distributorCompService.create(prodComp);
    }

    @Put(":id")
    async updateDistributorComp(@Param("id") id:string, @Body() prodComp:DistributorCompDTO):Promise<DistributorCompDTO>{
        return await this.distributorCompService.update(id, prodComp);
    }

    @Delete(":id")
    async deleteDistributorComp(@Param("id") id:string):Promise<DistributorCompDTO>{
        return await this.distributorCompService.delete(id);
    }
}
