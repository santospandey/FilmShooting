import { Test, TestingModule } from '@nestjs/testing';
import { ActorService } from './actor.service';
import { Repository } from 'typeorm';
import { ActorEntity } from './actor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from "faker";
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ActorDTO } from './actor.dto';

class ActorRepositoryFake {
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

    it("calls the repository with correct parameters", async() => {      
      const first_name = (faker.name.firstName()).toString();
      const last_name = (faker.name.lastName()).toString();
      const createdActorEntity:ActorEntity = new ActorEntity();
      createdActorEntity.first_name = first_name;
      createdActorEntity.last_name = last_name;
      
      const result = await actorService.create(createdActorEntity);
      expect(result.first_name).toEqual(first_name);
      expect(result.last_name).toEqual(last_name);
    })
  });


  describe("finding an actor", ()=>{
    it("throws exception when actor doesnot exist", async()=>{
      const actorId = faker.random.uuid();
      const actorRepositoryFindOneSpy = jest.spyOn(actorRepository, 'findOne').mockResolvedValue(null);
      try{
        await actorService.getByID(actorId);
      }
      catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe("Actor Not Found");
      }
    });

    it("returns the found actor", async ()=>{
      const actorId = faker.random.uuid();
      const existingActor = new ActorEntity();
      existingActor.id = actorId;
      existingActor.first_name = faker.name.firstName();
      existingActor.last_name = faker.name.lastName();
      existingActor.created = new Date();

      const actorRepositoryFindSpy = jest.spyOn(actorRepository, 'findOne').mockResolvedValue(existingActor);
      const result = await actorService.getByID(actorId);
      expect(result).toBe(existingActor);
      expect(actorRepositoryFindSpy).toHaveBeenLastCalledWith(actorId);
    })
  });

  describe("removing an actor", ()=>{
    
  })

});
