import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDTO } from './location.dto';
import { ApiOkResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@Controller('api/rest/location')
export class LocationController {
    constructor(private locationService:LocationService){}

    @Get()
    @ApiOkResponse({
        description: "get all locations"
    })
    async getLocation():Promise<LocationDTO[]>{
        return await this.locationService.get();
    }

    @Get(":id")
    @ApiOkResponse({
        description: "get location by id"
    })    
    async getLocationByID(@Param("id") id:string):Promise<LocationDTO>{
        return await this.locationService.getById(id);
    }

    @Post()
    @ApiCreatedResponse({
        description: "create location"
    })
    @ApiBody({
        type: LocationDTO
    })
    async createLocation(@Body(new ValidationPipe()) location:LocationDTO):Promise<LocationDTO>{
        return await this.locationService.create(location);
    }

    @Put(":id")
    @ApiOkResponse({
        description: "update location"
    })
    @ApiBody({
        type: LocationDTO
    })
    async updateLocation(@Param("id") id:string, @Body(new ValidationPipe()) location:Partial<LocationDTO>):Promise<LocationDTO>{
        return await this.locationService.update(id, location);
    }

    @Delete(":id")
    @ApiOkResponse({
        description: "delete location"
    })
    async deleteLocation(@Param("id") id:string):Promise<LocationDTO>{
        return await this.locationService.delete(id);
    }
}
