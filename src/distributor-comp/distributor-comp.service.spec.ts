import { Test, TestingModule } from '@nestjs/testing';
import { DistributorCompService } from './distributor-comp.service';
import { Repository } from 'typeorm';
import { DistributorCompEntity } from './distributor-comp.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from "faker";
import { BadRequestException, NotFoundException } from '@nestjs/common';

export default class DistributorCompRepositoryFake {
  public async find(): Promise<void> { };
  public async findOne(): Promise<void> { };
  public async save(): Promise<void> { };
  public async update(): Promise<void> { };
  public async delete(): Promise<void> { };
}

describe('DistributorCompService', () => {
  let distributorCompService: DistributorCompService;
  let distributorCompRepository: Repository<DistributorCompEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DistributorCompService,
        {
          provide: getRepositoryToken(DistributorCompEntity),
          useClass: DistributorCompRepositoryFake
        }
      ],
    }).compile();

    distributorCompService = module.get<DistributorCompService>(DistributorCompService);
    distributorCompRepository = module.get(getRepositoryToken(DistributorCompEntity));
  });


  describe("finding all distributor company", () => {
    it("passes when all company fetched", async () => {
      const distributorCompany: DistributorCompEntity[] = [1, 2, 3].map(num => {
        return {
          id: faker.random.uuid(),
          name: faker.random.word.toString(),
          created: new Date(),
          films: []
        }
      });

      const distributorCompFindSpy = jest.spyOn(distributorCompRepository, "find").mockResolvedValue(distributorCompany);
      const result = await distributorCompService.get();
      expect(result).toBe(distributorCompany);
      expect(distributorCompFindSpy).toBeCalled();
    });
  });

  describe("finding a distributor company", () => {
    it("throws an exception when distributor company doesnot exists", async () => {
      const distCompanyId = faker.random.uuid();
      try {
        await distributorCompService.getById(distCompanyId);
      }
      catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe("Distributor Company Not Found");
      }
    });

    it("returns a found distributor company", async () => {
      const distCompanyId = faker.random.uuid();
      const existingCompany: DistributorCompEntity = {
        id: faker.random.uuid(),
        name: faker.random.word.toString(),
        created: new Date(),
        films: []
      };

      const distributorCompanyFindSpy = jest.spyOn(distributorCompRepository, "findOne").mockResolvedValue(existingCompany);
      const result = await distributorCompService.getById(distCompanyId);
      expect(result).toBe(existingCompany);
      expect(distributorCompanyFindSpy).toBeCalledWith(distCompanyId);
    });
  });

  describe("creating a distributor company", () => {
    it("should throw an error when no name provided", async () => {
      const name = "";
      try {
        await distributorCompService.create({ name })
      }
      catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it("should create distributor company when correct parameter provided", async () => {
      const name = faker.name.firstName();
      const distributorCompanySaveSpy = jest.spyOn(distributorCompRepository, "save").mockResolvedValue(null);
      const result = await distributorCompService.create({ name });
      expect(distributorCompanySaveSpy).toBeCalledWith({ name });
      expect(result.name).toBe(name);
    });
  });

  describe("removing a distributor company", () => {
    it("should remove the distributor company", async () => {
      const distributorCompanyId = faker.random.uuid().toString();
      const distributorCompany: DistributorCompEntity = {
        id: distributorCompanyId,
        name: faker.name.toString(),
        created: new Date(),
        films: []
      };

      const distributorCompanyFindSpy = jest.spyOn(distributorCompRepository, 'findOne').mockResolvedValue(distributorCompany);
      const distributorCompanyDeleteSpy = jest.spyOn(distributorCompRepository, 'delete').mockResolvedValue(null);
      const result = await distributorCompService.delete(distributorCompanyId);

      expect(distributorCompanyFindSpy).toHaveBeenCalledWith(distributorCompanyId);
      expect(distributorCompanyDeleteSpy).toHaveBeenCalledWith(distributorCompanyId);
      expect(result).toBe(distributorCompany);
    });
  });

  describe("updating a distributor company", () => {
    it("should update distributor company", async () => {
      const distributorCompanyId = faker.random.uuid();
      const distributorCompany: DistributorCompEntity = {
        id: distributorCompanyId,
        name: faker.name.toString(),
        created: new Date(),
        films: []
      };
      const distributorCompanyFindSpy = jest.spyOn(distributorCompRepository, 'findOne').mockResolvedValue(distributorCompany);
      const distributorCompanyUpdateSpy = jest.spyOn(distributorCompRepository, 'update').mockResolvedValue(null);

      const result = await distributorCompService.update(distributorCompanyId, { name: distributorCompany.name });
      expect(distributorCompanyFindSpy).toHaveBeenCalledWith(distributorCompanyId);
      expect(distributorCompanyUpdateSpy).toHaveBeenCalledWith(distributorCompanyId, { name: distributorCompany.name });
    });
  });
});
