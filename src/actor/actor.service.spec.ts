import { Test, TestingModule } from '@nestjs/testing';
import { ActorService } from './actor.service';
import { Repository } from 'typeorm';
import { ActorEntity } from './actor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from "faker";
import { BadRequestException, NotFoundException } from '@nestjs/common';

export default class ActorRepositoryFake {
  public async find(): Promise<void> { };
  public async findOne(): Promise<void> { };
  public async save(): Promise<void> { };
  public async update(): Promise<void> { };
  public async delete(): Promise<void> { };
}

describe('ActorService', () => {
  let actorService: ActorService;
  let actorRepository: Repository<ActorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorService,
        {
          provide: getRepositoryToken(ActorEntity),
          useClass: ActorRepositoryFake
        }
      ],
    }).compile();

    actorService = module.get<ActorService>(ActorService);
    actorRepository = module.get(getRepositoryToken(ActorEntity));
  });

  describe("finding all actors", ()=>{
    it("passes when the actors are fetched", async ()=>{
      const actors = [1,2,3].map(num=>{
        return {
          id: faker.random.uuid(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          created: new Date()
        }      
      })
      const actorRepositoryFindSpy = jest.spyOn(actorRepository, 'find').mockResolvedValue(actors);
      const result = await actorService.get();
      expect(result).toBe(actors);
      expect(actorRepositoryFindSpy).toBeCalled();
    })    
  });

  describe("finding an actor", () => {
    it("throws exception when actor doesnot exist", async () => {
      const actorId = faker.random.uuid();
      try {
        await actorService.getByID(actorId);
      }
      catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe("Actor Not Found");
      }
    });

    it("returns the found actor", async () => {
      const actorId = faker.random.uuid();
      const existingActor: ActorEntity = {
        id: actorId,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        created: new Date()
      }

      const actorRepositoryFindSpy = jest.spyOn(actorRepository, 'findOne').mockResolvedValue(existingActor);
      const result = await actorService.getByID(actorId);
      expect(result).toBe(existingActor);
      expect(actorRepositoryFindSpy).toHaveBeenLastCalledWith(actorId);
    });
  });

  describe("creating an actor", () => {
    it("throws an error when no name provided", async () => {
      const first_name = "";
      const last_name = "";
      try {
        await actorService.create({ first_name, last_name })
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
        await actorService.create({ first_name, last_name })
      }
      catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    })

    it("calls the repository with correct parameters", async () => {
      const first_name = (faker.name.firstName()).toString();
      const last_name = (faker.name.lastName()).toString();
      const createdActorEntity = { first_name, last_name };

      const actorRepositorySaveSpy = jest.spyOn(actorRepository, 'save').mockResolvedValue(null);
      const result = await actorService.create(createdActorEntity);
      expect(actorRepositorySaveSpy).toBeCalledWith(createdActorEntity);
      expect(result.first_name).toBe(first_name);
      expect(result.last_name).toBe(last_name);
    })
  });

  describe("removing an actor", () => {
    it("calls the repository with correct parameters", async () => {
      const actorId = faker.random.uuid();
      const existingActor: ActorEntity = {
        id: actorId,
        created: new Date(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName()
      };

      const actorRepositoryFindSpy = jest.spyOn(actorRepository, 'findOne').mockResolvedValue(existingActor);
      const actorRepositoryDeleteSpy = jest.spyOn(actorRepository, 'delete').mockResolvedValue(null);
      const result = await actorService.delete(actorId);
      expect(actorRepositoryFindSpy).toHaveBeenCalledWith(actorId);
      expect(result).toBe(existingActor);
      expect(actorRepositoryDeleteSpy).toHaveBeenCalledWith(actorId);
    })
  })

  describe("updating an actor", () => {
    it("calls the repository with correct parameters", async () => {
      const actorId = faker.random.uuid();
      const first_name = faker.name.firstName();
      const last_name = faker.name.lastName();

      const newActorData: ActorEntity = {
        id: actorId,
        first_name,
        last_name,
        created: new Date()
      };

      const actorRepositoryFindSpy = jest.spyOn(actorRepository, 'findOne').mockResolvedValue(newActorData);
      const actorRepositoryUpdateSpy = jest.spyOn(actorRepository, 'update').mockResolvedValue(null);

      const result = await actorService.update(actorId, { first_name, last_name });

      expect(actorRepositoryFindSpy).toHaveBeenCalledWith(actorId);
      expect(actorRepositoryFindSpy).toHaveBeenCalledTimes(2);
      expect(actorRepositoryUpdateSpy).toHaveBeenCalledWith(actorId, { first_name, last_name });
    });
  });
});
