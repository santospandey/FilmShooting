import { Length, IsString, IsDate, MinLength, IsDefined, IsNotEmpty } from "class-validator";

export class FilmDTO {
    @Length(2, 100)
    title: string;
        
    @IsDate()
    release_date: Date;

    @IsString()    
    @IsDefined()
    productionCompanyId: string;

    @IsString()
    distributorCompanyId: string;

    @IsNotEmpty()
    actorsId: string[];
    
    
    writersId: string[];
    
    directorsId: string[];

    @IsNotEmpty()
    locationsId: string[];
}