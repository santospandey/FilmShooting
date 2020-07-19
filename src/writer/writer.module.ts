import { Module } from '@nestjs/common';
import { WriterService } from './writer.service';
import { WriterController } from './writer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WriterEntity } from './writer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WriterEntity])],
  providers: [WriterService],
  controllers: [WriterController]
})
export class WriterModule {}
