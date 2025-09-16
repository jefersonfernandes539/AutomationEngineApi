import { Module } from '@nestjs/common';
import { RobotsModule } from './robots/robots.module';
import { KafkaModule } from './infra/kafka.module';

@Module({
  imports: [RobotsModule, KafkaModule],
})
export class AppModule {}
