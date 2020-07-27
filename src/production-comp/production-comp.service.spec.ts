import { Test, TestingModule } from '@nestjs/testing';
import { ProductionCompService } from './production-comp.service';
import { Repository } from 'typeorm';
import { ProductionCompEntity } from './production-comp.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from "faker";
import { BadRequestException, NotFoundException } from '@nestjs/common';

class ProductionCompRepositoryFake {
  public async find(): Promise<void> { };
  public async findOne(): Promise<void> { };
  public async save(): Promise<void> { };
  public async update(): Promise<void> { };
  public async delete(): Promise<void> { };
}

describe('ProductionCompService', () => {
  let productionCompService: ProductionCompService;
  let productionCompRepository: Repository<ProductionCompEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductionCompService,
        {
          provide: getRepositoryToken(ProductionCompEntity),
          useClass: ProductionCompRepositoryFake
        }
      ],
    }).compile();

    productionCompService = module.get<ProductionCompService>(ProductionCompService);
    productionCompRepository = module.get(getRepositoryToken(ProductionCompEntity));
  });


  describe("finding all production company", () => {
    it("passes when all company fetched", async () => {
      const productionCompany: ProductionCompEntity[] = [1, 2, 3].map(num => {
        return {
          id: faker.random.uuid(),
          name: faker.random.word.toString(),
          created: new Date(),
          films: []
        }
      });

      const productionCompFindSpy = jest.spyOn(productionCompRepository, "find").mockResolvedValue(productionCompany);
      const result = await productionCompService.get();
      expect(result).toBe(productionCompany);
      expect(productionCompFindSpy).toBeCalled();
    });
  });

  describe("finding a production company", () => {
    it("throws an exception when production company doesnot exists", async () => {
      const distCompanyId = faker.random.uuid();
      try {
        await productionCompService.getById(distCompanyId);
      }
      catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe("Production Company Not Found");
      }
    });

    it("returns a found production company", async () => {
      const distCompanyId = faker.random.uuid();
      const existingCompany: ProductionCompEntity = {
        id: faker.random.uuid(),
        name: faker.random.word.toString(),
        created: new Date(),
        films: []
      };

      const productionCompanyFindSpy = jest.spyOn(productionCompRepository, "findOne").mockResolvedValue(existingCompany);
      const result = await productionCompService.getById(distCompanyId);
      expect(result).toBe(existingCompany);
      expect(productionCompanyFindSpy).toBeCalledWith(distCompanyId);
    });
  });

  describe("creating a production company", () => {
    it("should throw an error when no name provided", async () => {
      const name = "";
      try {
        await productionCompService.create({ name })
      }
      catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it("should create production company when correct parameter provided", async () => {
      const name = faker.name.firstName();
      const productionCompanySaveSpy = jest.spyOn(productionCompRepository, "save").mockResolvedValue(null);
      const result = await productionCompService.create({ name });
      expect(productionCompanySaveSpy).toBeCalledWith({ name });
      expect(result.name).toBe(name);
    });
  });

  describe("removing a production company", () => {
    it("should remove the production company", async () => {
      const productionCompanyId = faker.random.uuid().toString();
      const productionCompany: ProductionCompEntity = {
        id: productionCompanyId,
        name: faker.name.toString(),
        created: new Date(),
        films: []
      };

      const productionCompanyFindSpy = jest.spyOn(productionCompRepository, 'findOne').mockResolvedValue(productionCompany);
      const productionCompanyDeleteSpy = jest.spyOn(productionCompRepository, 'delete').mockResolvedValue(null);
      const result = await productionCompService.delete(productionCompanyId);

      expect(productionCompanyFindSpy).toHaveBeenCalledWith(productionCompanyId);
      expect(productionCompanyDeleteSpy).toHaveBeenCalledWith(productionCompanyId);
      expect(result).toBe(productionCompany);
    });
  });

  describe("updating a production company", () => {
    it("should update production company", async () => {
      const productionCompanyId = faker.random.uuid();
      const productionCompany: ProductionCompEntity = {
        id: productionCompanyId,
        name: faker.name.toString(),
        created: new Date(),
        films: []
      };
      const productionCompanyFindSpy = jest.spyOn(productionCompRepository, 'findOne').mockResolvedValue(productionCompany);
      const productionCompanyUpdateSpy = jest.spyOn(productionCompRepository, 'update').mockResolvedValue(null);

      const result = await productionCompService.update(productionCompanyId, { name: productionCompany.name });
      expect(productionCompanyFindSpy).toHaveBeenCalledWith(productionCompanyId);
      expect(productionCompanyUpdateSpy).toHaveBeenCalledWith(productionCompanyId, { name: productionCompany.name });
    });
  });
});
