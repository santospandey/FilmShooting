import { Controller, Get, Param, Body, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import { DistributorCompService } from './distributor-comp.service';
import { DistributorCompDTO } from "./distributor-comp.dto";

@Controller('api/rest/distributor-company')
export class DistributorCompController {
    constructor(private distributorCompService:DistributorCompService){}

    @Get()
    getDistributorComp():Promise<DistributorCompDTO[]>{
        return this.distributorCompService.get();
    }

    @Get(":id")
    getDistributorCompById(@Param("id") id:string):Promise<DistributorCompDTO>{
        return this.distributorCompService.getById(id);
    }

    @Post()
    createDistributorComp(@Body(new ValidationPipe()) prodComp:DistributorCompDTO):Promise<DistributorCompDTO>{
        return this.distributorCompService.create(prodComp);
    }

    @Put(":id")
    updateDistributorComp(@Param("id") id:string, @Body(new ValidationPipe()) prodComp:DistributorCompDTO):Promise<DistributorCompDTO>{
        return this.distributorCompService.update(id, prodComp);
    }

    @Delete(":id")
    deleteDistributorComp(@Param("id") id:string):Promise<DistributorCompDTO>{
        return this.distributorCompService.delete(id);
    }
}
