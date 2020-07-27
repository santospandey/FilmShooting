import { Length } from "class-validator";

export class LocationDTO {
    @Length(2, 50)
    name: string;
    
    latitude?: string;
    
    longitude?: string;
}