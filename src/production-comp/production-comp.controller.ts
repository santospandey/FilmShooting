import { Controller, Get, Param, Body, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import { ProductionCompService } from './production-comp.service';
import { ProductionCompDTO } from './production-comp.dto';
import { ApiOkResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@Controller('api/rest/production-company')
export class ProductionCompController {
    constructor(private productionCompService:ProductionCompService){}

    @Get()
    @ApiOkResponse({
        description: "get all production company"
    })
    async getProductionComp():Promise<ProductionCompDTO[]>{
        return await this.productionCompService.get();
    }

    @Get(":id")
    @ApiOkResponse({
        description: "get production company by id"
    })
    async getProductionCompById(@Param("id") id:string):Promise<ProductionCompDTO>{
        return await this.productionCompService.getById(id);
    }

    @Post()
    @ApiCreatedResponse({
        description: "create production company"
    })
    @ApiBody({
        type: ProductionCompDTO
    })
    async createProductionComp(@Body(new ValidationPipe()) prodComp:ProductionCompDTO):Promise<ProductionCompDTO>{
        return await this.productionCompService.create(prodComp);
    }

    @Put(":id")
    @ApiOkResponse({
        description: "update production company"
    })
    @ApiBody({
        type: ProductionCompDTO
    })
    async updateProductionComp(@Param("id") id:string, @Body(new ValidationPipe()) prodComp:ProductionCompDTO):Promise<ProductionCompDTO>{
        return await this.productionCompService.update(id, prodComp);
    }

    @Delete(":id")
    @ApiOkResponse({
        description: "delete Production Company"
    })    
    async deleteProductionComp(@Param("id") id:string):Promise<ProductionCompDTO>{
        return await this.productionCompService.delete(id);
    }
}
