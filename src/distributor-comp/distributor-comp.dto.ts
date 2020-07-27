import { Length } from "class-validator";

export class DistributorCompDTO{
    @Length(2, 100)
    name:string;
}