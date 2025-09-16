import { Module } from '@nestjs/common';
import { RobotsController } from './robots.controller';
import { RobotsService } from './robots.service';
import { KafkaModule } from 'src/infra/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [RobotsController],
  providers: [RobotsService],
})
export class RobotsModule {}
