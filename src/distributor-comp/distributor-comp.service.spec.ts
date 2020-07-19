import { Test, TestingModule } from '@nestjs/testing';
import { DistributorCompService } from './distributor-comp.service';

describe('DistributorCompService', () => {
  let service: DistributorCompService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistributorCompService],
    }).compile();

    service = module.get<DistributorCompService>(DistributorCompService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
