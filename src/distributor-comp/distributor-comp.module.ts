import { Module } from '@nestjs/common';
import { DistributorCompController } from './distributor-comp.controller';
import { DistributorCompService } from './distributor-comp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistributorCompEntity } from './distributor-comp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DistributorCompEntity])],
  controllers: [DistributorCompController],
  providers: [DistributorCompService]
})
export class DistributorCompModule {}
