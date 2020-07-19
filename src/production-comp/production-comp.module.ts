import { Module } from '@nestjs/common';
import { ProductionCompController } from './production-comp.controller';
import { ProductionCompService } from './production-comp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionCompEntity } from './production-comp.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductionCompEntity])],
  controllers: [ProductionCompController],
  providers: [ProductionCompService]
})
export class ProductionCompModule {}
