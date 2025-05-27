import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { TeamsModule } from './team/team.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true 
    }), 
    UserModule, AdminModule, TeamsModule, SupabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
