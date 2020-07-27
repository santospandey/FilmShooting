import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDTO } from './location.dto';

@Controller('api/rest/location')
export class LocationController {
    constructor(private locationService:LocationService){}

    @Get()
    async getLocation():Promise<LocationDTO[]>{
        return await this.locationService.get();
    }

    @Get(":id")
    async getLocationByID(@Param("id") id:string):Promise<LocationDTO>{
        return await this.locationService.getById(id);
    }

    @Post()
    async createLocation(@Body(new ValidationPipe()) location:LocationDTO):Promise<LocationDTO>{
        return await this.locationService.create(location);
    }

    @Put(":id")
    async updateLocation(@Param("id") id:string, @Body(new ValidationPipe()) location:Partial<LocationDTO>):Promise<LocationDTO>{
        return await this.locationService.update(id, location);
    }

    @Delete(":id")
    async deleteLocation(@Param("id") id:string):Promise<LocationDTO>{
        return await this.locationService.delete(id);
    }
}
