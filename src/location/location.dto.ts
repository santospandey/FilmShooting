import { Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LocationDTO {
    @Length(2, 50)
    @ApiProperty({
        type: String,
        description: "name"
    })
    name: string;
    
    @ApiProperty({
        type: String,
        description: "latitude"
    })
    latitude?: string;
    
    @ApiProperty({
        type: String,
        description: "longitude"
    })
    longitude?: string;
}