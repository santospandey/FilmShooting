import { Controller, Get, Param, Body, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import { DistributorCompService } from './distributor-comp.service';
import { DistributorCompDTO } from "./distributor-comp.dto";
import { ApiOkResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@Controller('api/rest/distributor-company')
export class DistributorCompController {
    constructor(private distributorCompService:DistributorCompService){}

    @Get()
    @ApiOkResponse({
        description: "get all distributor company"
    })
    getDistributorComp():Promise<DistributorCompDTO[]>{
        return this.distributorCompService.get();
    }

    @Get(":id")
    @ApiOkResponse({
        description: "get distributor company by id"
    })
    getDistributorCompById(@Param("id") id:string):Promise<DistributorCompDTO>{
        return this.distributorCompService.getById(id);
    }

    @Post()
    @ApiCreatedResponse({
        description: "create distributor company"
    })
    @ApiBody({
        type: DistributorCompDTO
    })
    createDistributorComp(@Body(new ValidationPipe()) prodComp:DistributorCompDTO):Promise<DistributorCompDTO>{
        return this.distributorCompService.create(prodComp);
    }

    @Put(":id")
    @ApiOkResponse({
        description: "updated distributor company"
    })
    @ApiBody({
        type: DistributorCompDTO
    })
    updateDistributorComp(@Param("id") id:string, @Body(new ValidationPipe()) prodComp:DistributorCompDTO):Promise<DistributorCompDTO>{
        return this.distributorCompService.update(id, prodComp);
    }

    @Delete(":id")
    @ApiOkResponse({
        description: "deleted distributor"
    })
    deleteDistributorComp(@Param("id") id:string):Promise<DistributorCompDTO>{
        return this.distributorCompService.delete(id);
    }
}
