import { Test, TestingModule } from '@nestjs/testing';
import { WriterService } from './writer.service';
import { Repository } from 'typeorm';
import { WriterEntity } from './writer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from "faker";
import { BadRequestException, NotFoundException } from '@nestjs/common';

export default class WriterRepositoryFake {
  public async find(): Promise<void> { };
  public async findOne(): Promise<void> { };
  public async save(): Promise<void> { };
  public async update(): Promise<void> { };
  public async delete(): Promise<void> { };
};

describe('WriterService', () => {
  let writerService: WriterService;
  let writerRepository: Repository<WriterEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WriterService,
        {
          provide: getRepositoryToken(WriterEntity),
          useClass: WriterRepositoryFake
        }
      ],
    }).compile();

    writerService = module.get<WriterService>(WriterService);
    writerRepository = module.get(getRepositoryToken(WriterEntity));
  });

  describe("finding all writers", ()=>{
    it("passes when the writers are fetched", async ()=>{
      const writers = [1,2,3].map(num=>{
        return {
          id: faker.random.uuid(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          created: new Date()
        }      
      })
      const writerRepositoryFindSpy = jest.spyOn(writerRepository, 'find').mockResolvedValue(writers);
      const result = await writerService.get();
      expect(result).toBe(writers);
      expect(writerRepositoryFindSpy).toBeCalled();
    })    
  });

  describe("finding a writer", () => {
    it("throws exception when writer doesnot exist", async () => {
      const writerId = faker.random.uuid();
      try {
        await writerService.getByID(writerId);
      }
      catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe("Writer Not Found");
      }
    });

    it("returns the found writer", async () => {
      const writerId = faker.random.uuid();
      const existingWriter: WriterEntity = {
        id: writerId,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        created: new Date()
      }

      const writerRepositoryFindSpy = jest.spyOn(writerRepository, 'findOne').mockResolvedValue(existingWriter);
      const result = await writerService.getByID(writerId);
      expect(result).toBe(existingWriter);
      expect(writerRepositoryFindSpy).toHaveBeenLastCalledWith(writerId);
    });
  });

  describe("creating a writer", () => {
    it("throws an error when no name provided", async () => {
      const first_name = "";
      const last_name = "";
      try {
        await writerService.create({ first_name, last_name })
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
        await writerService.create({ first_name, last_name })
      }
      catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    })

    it("calls the repository with correct parameters", async () => {
      const first_name = (faker.name.firstName()).toString();
      const last_name = (faker.name.lastName()).toString();
      const createdWriterEntity = { first_name, last_name };

      const writerRepositorySaveSpy = jest.spyOn(writerRepository, 'save').mockResolvedValue(null);
      const result = await writerService.create(createdWriterEntity);
      expect(writerRepositorySaveSpy).toBeCalledWith(createdWriterEntity);
      expect(result.first_name).toBe(first_name);
      expect(result.last_name).toBe(last_name);
    })
  });

  describe("removing a writer", () => {
    it("calls the repository with correct parameters", async () => {
      const writerId = faker.random.uuid();
      const existingWriter: WriterEntity = {
        id: writerId,
        created: new Date(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName()
      };

      const writerRepositoryFindSpy = jest.spyOn(writerRepository, 'findOne').mockResolvedValue(existingWriter);
      const writerRepositoryDeleteSpy = jest.spyOn(writerRepository, 'delete').mockResolvedValue(null);
      const result = await writerService.delete(writerId);
      expect(writerRepositoryFindSpy).toHaveBeenCalledWith(writerId);
      expect(result).toBe(existingWriter);
      expect(writerRepositoryDeleteSpy).toHaveBeenCalledWith(writerId);
    })
  })

  describe("updating a writer", () => {
    it("calls the repository with correct parameters", async () => {
      const writerId = faker.random.uuid();
      const first_name = faker.name.firstName();
      const last_name = faker.name.lastName();

      const newWriterData: WriterEntity = {
        id: writerId,
        first_name,
        last_name,
        created: new Date()
      };

      const writerRepositoryFindSpy = jest.spyOn(writerRepository, 'findOne').mockResolvedValue(newWriterData);
      const writerRepositoryUpdateSpy = jest.spyOn(writerRepository, 'update').mockResolvedValue(null);

      const result = await writerService.update(writerId, { first_name, last_name });

      expect(writerRepositoryFindSpy).toHaveBeenCalledWith(writerId);
      expect(writerRepositoryFindSpy).toHaveBeenCalledTimes(2);
      expect(writerRepositoryUpdateSpy).toHaveBeenCalledWith(writerId, { first_name, last_name });
    });
  });  
});
