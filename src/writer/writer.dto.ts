import { Length } from "class-validator";

export class WriterDTO{
    @Length(2, 50)
    first_name:string;

    @Length(2, 50)
    last_name:string;    
}