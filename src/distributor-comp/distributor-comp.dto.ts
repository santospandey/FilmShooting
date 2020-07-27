import { Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DistributorCompDTO{
    @Length(2, 100)
    @ApiProperty({
        type: String,
        description: "name"
    })
    name:string;
}