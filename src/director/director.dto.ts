import { Length } from "class-validator";

export class DirectorDTO{
    @Length(2, 50)
    first_name: string;

    @Length(2, 50)
    last_name: string;
}