import { Test, TestingModule } from '@nestjs/testing';
import { ProductionCompService } from './production-comp.service';

describe('ProductionCompService', () => {
  let service: ProductionCompService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionCompService],
    }).compile();

    service = module.get<ProductionCompService>(ProductionCompService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
