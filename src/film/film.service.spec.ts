import { Test, TestingModule } from '@nestjs/testing';
import { FilmService } from './film.service';
import { Repository } from 'typeorm';
import { FilmEntity } from './entity/film.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from "faker";
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { async } from 'rxjs';
import ActorRepositoryFake from "../actor/actor.service.spec";
import DirectorRepositoryFake from "../director/director.service.spec";
import DistributorCompRepositoryFake from "../distributor-comp/distributor-comp.service.spec";
import LocationRepositoryFake from "../location/location.service.spec";
import ProductionCompRepositoryFake from "../production-comp/production-comp.service.spec";
import WriterRepositoryFake from "../writer/writer.service.spec";
import { ActorEntity } from '../actor/actor.entity';
import { DirectorEntity } from '../director/director.entity';
import { DistributorCompEntity } from '../distributor-comp/distributor-comp.entity';
import { LocationEntity } from '../location/location.entity';
import { ProductionCompEntity } from '../production-comp/production-comp.entity';
import { WriterEntity } from '../writer/writer.entity';
import { FilmDTO } from './dto/film.dto';

class FilmRepositoryFake {
  public async find(): Promise<void> { };
  public async findOne(): Promise<void> { };
  public async save(): Promise<void> { };
  public async update(): Promise<void> { };
  public async delete(): Promise<void> { };
}

describe('FilmService', () => {
  let filmService: FilmService;
  let filmRepository: Repository<FilmEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmService,
        {
          provide: getRepositoryToken(FilmEntity),
          useClass: FilmRepositoryFake
        },
        {
          provide: getRepositoryToken(ActorEntity),
          useClass: ActorRepositoryFake
        },
        {
          provide: getRepositoryToken(DirectorEntity),
          useClass: DirectorRepositoryFake
        },
        {
          provide: getRepositoryToken(DistributorCompEntity),
          useClass: DistributorCompRepositoryFake
        },
        {
          provide: getRepositoryToken(LocationEntity),
          useClass: LocationRepositoryFake
        },
        {
          provide: getRepositoryToken(ProductionCompEntity),
          useClass: ProductionCompRepositoryFake
        },
        {
          provide: getRepositoryToken(WriterEntity),
          useClass: WriterRepositoryFake
        }
      ],
    }).compile();

    filmService = module.get<FilmService>(FilmService);
    filmRepository = module.get(getRepositoryToken(FilmEntity));
  });

  describe("finding all films", ()=>{
    it("should list all the films", async()=>{
      const filmRepositoryFindSpy = jest.spyOn(filmRepository, "find").mockResolvedValue(null);
      await filmService.get("");
      expect(filmRepositoryFindSpy).toBeCalled();
    });
  });

  describe("finding a film", ()=>{
    it("should find a single film", async()=>{
      const filmId = faker.random.uuid().toString();
      const filmRepositoryFindSpy = jest.spyOn(filmRepository, "findOne").mockResolvedValue(new FilmEntity());
      await filmService.getByID(filmId);
      expect(filmRepositoryFindSpy).toHaveBeenCalled();
    });
  });

  describe("creating a film", ()=>{
    it("should create a film", async()=>{
      const film:FilmDTO = {
        title: faker.random.word.toString(),
        release_date: new Date(),
        productionCompanyId: faker.random.word.toString(),
        distributorCompanyId: faker.random.word.toString(),
        actorsId: [],
        writersId: [],
        directorsId: [],
        locationsId: []
      };
      const filmRepositorySaveSpy = jest.spyOn(filmRepository, "save").mockResolvedValue(new FilmEntity());      
      await filmService.create(film);
      expect(filmRepositorySaveSpy).toHaveBeenCalled();      
    });
  });
  

});
