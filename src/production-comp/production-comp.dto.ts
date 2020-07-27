import { Length } from "class-validator";

export class ProductionCompDTO{
    @Length(2, 100)
    name:string;
}