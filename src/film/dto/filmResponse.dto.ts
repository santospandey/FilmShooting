import { ProductionCompDTO } from "src/production-comp/production-comp.dto";
import { DistributorCompDTO } from "src/distributor-comp/distributor-comp.dto";
import { DirectorDTO } from "src/director/director.dto";
import { WriterDTO } from "src/writer/writer.dto";
import { ActorDTO } from "src/actor/actor.dto";


export class FilmResponse{
    id: string;
    title: string;
    release_date: Date;
    created: Date;
    productionCompany: ProductionCompDTO;
    distributorCompany: DistributorCompDTO;
    directors: DirectorDTO[];
    writers: WriterDTO[];
    actors: ActorDTO[];
}