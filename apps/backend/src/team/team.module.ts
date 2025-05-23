import { Module } from '@nestjs/common';
import { TeamsService } from './team.service';
import { TeamsController } from './team.controller';

@Module({
  providers: [TeamsService],
  controllers: [TeamsController]
})
export class TeamsModule {}
