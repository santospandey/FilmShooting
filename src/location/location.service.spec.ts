import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { Repository } from 'typeorm';
import { LocationEntity } from './location.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from "faker";
import { BadRequestException, NotFoundException } from '@nestjs/common';

export default class LocationRepositoryFake {
  public async find(): Promise<void> { };
  public async findOne(): Promise<void> { };
  public async save(): Promise<void> { };
  public async update(): Promise<void> { };
  public async delete(): Promise<void> { };
}

describe('LocationService', () => {
  let locationService: LocationService;
  let locationRepository: Repository<LocationEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(LocationEntity),
          useClass: LocationRepositoryFake
        }
      ],
    }).compile();

    locationService = module.get<LocationService>(LocationService);
    locationRepository = module.get(getRepositoryToken(LocationEntity));
  });


  describe("finding all location", () => {
    it("passes when all company fetched", async () => {
      const locations: LocationEntity[] = [1, 2, 3].map(num => {
        return {
          id: faker.random.uuid(),
          name: faker.random.word.toString(),
          created: new Date(),
          latitude: "",
          longitude: ""
        }
      });

      const locationFindSpy = jest.spyOn(locationRepository, "find").mockResolvedValue(locations);
      const result = await locationService.get();
      expect(result).toBe(locations);
      expect(locationFindSpy).toBeCalled();
    });
  });

  describe("finding a location", () => {
    it("throws an exception when location doesnot exists", async () => {
      const locationId = faker.random.uuid();
      try {
        await locationService.getById(locationId);
      }
      catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe("Location Not Found");
      }
    });

    it("returns a found location", async () => {
      const locationId = faker.random.uuid();
      const existingLocation: LocationEntity = {
        id: faker.random.uuid(),
        name: faker.random.word.toString(),
        created: new Date(),
        latitude: "",
        longitude: ""
      };

      const locationanyFindSpy = jest.spyOn(locationRepository, "findOne").mockResolvedValue(existingLocation);
      const result = await locationService.getById(locationId);
      expect(result).toBe(existingLocation);
      expect(locationanyFindSpy).toBeCalledWith(locationId);
    });
  });

  describe("creating a location", () => {
    it("should throw an error when no name provided", async () => {
      const name = "";      
      try {
        await locationService.create({ name })
      }
      catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it("should create location when correct parameter provided", async () => {
      const name = faker.name.firstName();
      const locationanySaveSpy = jest.spyOn(locationRepository, "save").mockResolvedValue(null);
      const result = await locationService.create({ name });
      expect(locationanySaveSpy).toBeCalledWith({ name });
      expect(result.name).toBe(name);
    });
  });

  describe("removing a location", () => {
    it("should remove the location", async () => {
      const locationanyId = faker.random.uuid().toString();
      const locationany: LocationEntity = {
        id: locationanyId,
        name: faker.name.toString(),
        created: new Date(),
        latitude: "",
        longitude: ""
      };

      const locationanyFindSpy = jest.spyOn(locationRepository, 'findOne').mockResolvedValue(locationany);
      const locationanyDeleteSpy = jest.spyOn(locationRepository, 'delete').mockResolvedValue(null);
      const result = await locationService.delete(locationanyId);

      expect(locationanyFindSpy).toHaveBeenCalledWith(locationanyId);
      expect(locationanyDeleteSpy).toHaveBeenCalledWith(locationanyId);
      expect(result).toBe(locationany);
    });
  });

  describe("updating a location", () => {
    it("should update location", async () => {
      const locationanyId = faker.random.uuid();
      const locationany: LocationEntity = {
        id: locationanyId,
        name: faker.name.toString(),
        created: new Date(),
        latitude: "",
        longitude: ""
      };
      const locationanyFindSpy = jest.spyOn(locationRepository, 'findOne').mockResolvedValue(locationany);
      const locationanyUpdateSpy = jest.spyOn(locationRepository, 'update').mockResolvedValue(null);

      const result = await locationService.update(locationanyId, { name: locationany.name });
      expect(locationanyFindSpy).toHaveBeenCalledWith(locationanyId);
      expect(locationanyUpdateSpy).toHaveBeenCalledWith(locationanyId, { name: locationany.name });
    });
  });
});
