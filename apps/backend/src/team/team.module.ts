import { Module } from '@nestjs/common';
import { TeamsService } from './team.service';
import { TeamsController } from './team.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [TeamsService],
  controllers: [TeamsController],
  exports: [TeamsService]
})
export class TeamsModule {}
