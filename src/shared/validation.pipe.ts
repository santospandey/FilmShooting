import { PipeTransform, ArgumentMetadata, Injectable, BadRequestException } from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

@Injectable()
export class ValidationPipe implements PipeTransform{
    async transform(value: any, {metatype}: ArgumentMetadata){        
        if(!metatype || !this.toValidate(metatype)){
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if(errors.length){
            throw new BadRequestException("Validation Failed");
        }
        return value;
    }

    private toValidate(metatype: Function):boolean{
        const types:Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}