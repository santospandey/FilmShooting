import { Test, TestingModule } from '@nestjs/testing';
import { DistributorCompController } from './distributor-comp.controller';

describe('DistributorComp Controller', () => {
  let controller: DistributorCompController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistributorCompController],
    }).compile();

    controller = module.get<DistributorCompController>(DistributorCompController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
