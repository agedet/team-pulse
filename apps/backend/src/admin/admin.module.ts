import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, SupabaseService]
})
export class AdminModule {}
