import { Test, TestingModule } from '@nestjs/testing';
import { WriterController } from './writer.controller';

describe('Writer Controller', () => {
  let controller: WriterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WriterController],
    }).compile();

    controller = module.get<WriterController>(WriterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
