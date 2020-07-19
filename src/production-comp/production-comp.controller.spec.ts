import { Test, TestingModule } from '@nestjs/testing';
import { ProductionCompController } from './production-comp.controller';

describe('ProductionComp Controller', () => {
  let controller: ProductionCompController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionCompController],
    }).compile();

    controller = module.get<ProductionCompController>(ProductionCompController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
