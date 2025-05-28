import { Module } from '@nestjs/common';
import { TeamsService } from './team.service';
import { TeamsController } from './team.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [SupabaseModule],
  providers: [TeamsService, AuthService],
  controllers: [TeamsController],
  exports: [TeamsService]
})
export class TeamsModule {}
