import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DirectorModule } from './director/director.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorModule } from './actor/actor.module';
import { WriterModule } from './writer/writer.module';
import { ProductionCompModule } from './production-comp/production-comp.module';
import { DistributorCompModule } from './distributor-comp/distributor-comp.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    DirectorModule,
    ActorModule,
    WriterModule,
    ProductionCompModule,
    DistributorCompModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
