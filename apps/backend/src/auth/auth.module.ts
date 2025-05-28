import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import {JwtModule} from '@nestjs/jwt';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule.register({}), SupabaseModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
