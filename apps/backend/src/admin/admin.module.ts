import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, SupabaseService, AuthService]
})
export class AdminModule {}
