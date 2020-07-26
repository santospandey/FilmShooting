import { Test, TestingModule } from '@nestjs/testing';
import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActorEntity } from './actor.entity';

class ActorRepositoryFake{
  public create():void{}
  public async save(): Promise<void>{}
  public async remove(): Promise<void>{}
  public async findOne(): Promise<void>{}
}

describe('Actor Controller', () => {
  let controller: ActorController;
  let service: ActorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorController],
      providers: [
        ActorService,
        {
          provide: getRepositoryToken(ActorEntity),
          useClass: ActorRepositoryFake
        }
      ],
    }).compile();

    service = module.get<ActorService>(ActorService);
    controller = module.get<ActorController>(ActorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });  
});
