import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { KafkaService } from '../infra/kafka.service';

@ApiTags('robots')
@Controller('robots')
export class RobotsController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('run')
  @ApiOperation({ summary: 'Enviar um job para execução do robô' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        robotId: { type: 'string', example: 'robot-123' },
        payload: {
          type: 'object',
          example: { param1: 'valor', param2: 42 },
        },
      },
      required: ['robotId', 'payload'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Job enviado para a fila com sucesso',
  })
  async runRobot(@Body() data: { robotId: string; payload: any }) {
    await this.kafkaService.sendMessage('robot-jobs', {
      robotId: data.robotId,
      payload: data.payload,
      timestamp: new Date(),
    });

    return { status: 'queued', robotId: data.robotId };
  }
}
