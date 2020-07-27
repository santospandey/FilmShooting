import { Test, TestingModule } from '@nestjs/testing';
import { DirectorService } from './director.service';
import { Repository } from 'typeorm';
import { DirectorEntity } from './director.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from "faker";
import { BadRequestException, NotFoundException } from '@nestjs/common';

export default class DirectorRepositoryFake {
  public async find(): Promise<void> { };
  public async findOne(): Promise<void> { };
  public async save(): Promise<void> { };
  public async update(): Promise<void> { };
  public async delete(): Promise<void> { };
}

describe('DirectorService', () => {
  let directorService: DirectorService;
  let directorRepository: Repository<DirectorEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DirectorService,
        {
          provide: getRepositoryToken(DirectorEntity),
          useClass: DirectorRepositoryFake
        }
      ],
    }).compile();

    directorService = module.get<DirectorService>(DirectorService);
    directorRepository = module.get(getRepositoryToken(DirectorEntity));
  });

  describe("finding all directors", ()=>{
    it("fetch all the directors", async()=> {
      const directors = [1,2,3].map(num=>{
        return {
          id: faker.random.uuid(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          created: new Date()
        }      
      });
      const directorRepositoryFindSpy = jest.spyOn(directorRepository, 'find').mockResolvedValue(directors);
      const result = await directorService.getDirectors();
      expect(result).toBe(directors);
      expect(directorRepositoryFindSpy).toBeCalled();
    });
  });

  describe("finding a director", () => {
    it("throws exception when director doesnot exist", async () => {
      const directorId = faker.random.uuid();
      try {
        await directorService.getDirectorById(directorId);
      }
      catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe("Director Not Found");
      }
    });

    it("returns the found director", async () => {
      const directorId = faker.random.uuid();
      const existingdirector: DirectorEntity = {
        id: directorId,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        created: new Date()
      }

      const directorRepositoryFindSpy = jest.spyOn(directorRepository, 'findOne').mockResolvedValue(existingdirector);
      const result = await directorService.getDirectorById(directorId);
      expect(result).toBe(existingdirector);
      expect(directorRepositoryFindSpy).toHaveBeenLastCalledWith(directorId);
    });
  });

  describe("creating a director", () => {
    it("throws an error when no name provided", async () => {
      const first_name = "";
      const last_name = "";
      try {
        await directorService.createDirector({ first_name, last_name })
      }
      catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    })

    it("throws an error when name length exceeds 50 characters", async () => {
      const first_name = faker.name.firstName();
      const last_name = `Hopefully, by now you understand why Nest’s codebases are easily testable and what’s going on behind the scenes.
       Now let’s take a look at a practical example: testing the aforementioned playlist module 
       scenario.`;
      try {
        await directorService.createDirector({ first_name, last_name })
      }
      catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    })

    it("calls the repository with correct parameters", async () => {
      const first_name = (faker.name.firstName()).toString();
      const last_name = (faker.name.lastName()).toString();
      const createdDirectorEntity = { first_name, last_name };

      const directorRepositorySaveSpy = jest.spyOn(directorRepository, 'save').mockResolvedValue(null);
      const result = await directorService.createDirector(createdDirectorEntity);
      expect(directorRepositorySaveSpy).toBeCalledWith(createdDirectorEntity);
      expect(result.first_name).toBe(first_name);
      expect(result.last_name).toBe(last_name);
    })
  });

  describe("removing a director", () => {
    it("calls the repository with correct parameters", async () => {
      const directorId = faker.random.uuid();
      const existingDirector: DirectorEntity = {
        id: directorId,
        created: new Date(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName()
      };

      const directorRepositoryFindSpy = jest.spyOn(directorRepository, 'findOne').mockResolvedValue(existingDirector);
      const directorRepositoryDeleteSpy = jest.spyOn(directorRepository, 'delete').mockResolvedValue(null);

      const result = await directorService.delete(directorId);

      expect(directorRepositoryFindSpy).toHaveBeenCalledWith(directorId);
      expect(result).toBe(existingDirector);
      expect(directorRepositoryDeleteSpy).toHaveBeenCalledWith(directorId);
    });
  });

  describe("updating a director", () => {
    it("calls the repository with correct parameters", async () => {
      const directorId = faker.random.uuid();
      const first_name = faker.name.firstName();
      const last_name = faker.name.lastName();

      const newDirectorData: DirectorEntity = {
        id: directorId,
        first_name,
        last_name,
        created: new Date()
      };

      const directorRepositoryFindSpy = jest.spyOn(directorRepository, 'findOne').mockResolvedValue(newDirectorData);
      const directorRepositoryUpdateSpy = jest.spyOn(directorRepository, 'update').mockResolvedValue(null);

      const result = await directorService.update(directorId, { first_name, last_name });

      expect(directorRepositoryFindSpy).toHaveBeenCalledWith(directorId);      
      expect(directorRepositoryUpdateSpy).toHaveBeenCalledWith(directorId, { first_name, last_name });
    });
  });

});
