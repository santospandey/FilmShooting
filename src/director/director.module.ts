import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorEntity } from './director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DirectorEntity])],
  providers: [DirectorService],
  controllers: [DirectorController]
})
export class DirectorModule {}
