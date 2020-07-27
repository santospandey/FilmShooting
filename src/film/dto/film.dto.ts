import { Length, IsString, IsDate, MinLength, IsDefined, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FilmDTO {
    @Length(2, 100)
    @ApiProperty({
        type: String,
        description: "title"
    })
    title: string;
        
    @IsDate()
    @ApiProperty({
        type: Date,
        description: "release_date"
    })
    release_date: Date;

    @IsString()    
    @IsDefined()
    @ApiProperty({
        type: String,
        description: "production company id"
    })
    productionCompanyId: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: "distributor company id"
    })
    distributorCompanyId: string;


    @IsNotEmpty()
    @ApiProperty({
        type: [String],
        description: "actors id"
    })
    actorsId: string[];
    

    @IsNotEmpty()
    @ApiProperty({
        type: [String],
        description: "writers id"
    })    
    writersId: string[];
    
    @IsNotEmpty()
    @ApiProperty({
        type: [String],
        description: "directors id"
    })
    directorsId: string[];

    @IsNotEmpty()
    @ApiProperty({
        type: [String],
        description: "locations id"
    })
    locationsId: string[];
}