import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { TeamModule } from './team/team.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AdminModule, TeamModule, SupabaseModule, AuthModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
