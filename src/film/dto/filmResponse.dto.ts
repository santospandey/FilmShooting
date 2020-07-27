import { ProductionCompDTO } from "../../production-comp/production-comp.dto";
import { DistributorCompDTO } from "../../distributor-comp/distributor-comp.dto";
import { DirectorDTO } from "../../director/director.dto";
import { WriterDTO } from "../../writer/writer.dto";
import { ActorDTO } from "../../actor/actor.dto";
import { LocationDTO } from "../../location/location.dto";


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
    locations: LocationDTO[]
}