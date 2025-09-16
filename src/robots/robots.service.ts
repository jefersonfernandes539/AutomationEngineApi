import { Injectable } from '@nestjs/common';
import { KafkaService } from '../infra/kafka.service';

@Injectable()
export class RobotsService {
  constructor(private readonly kafkaService: KafkaService) {}

  async createJob(job: any) {
    await this.kafkaService.sendMessage('robot-jobs', job);
    return { status: 'Job enviado com sucesso!' };
  }
}
