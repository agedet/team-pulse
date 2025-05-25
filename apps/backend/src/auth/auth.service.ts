import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
// import { supabase } from 'src/supabase/supabase';

@Injectable()
export class AuthService {
  constructor(private readonly supabase: SupabaseService) {}

  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return decoded;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { fullName, email, password } = registerUserDto;

    const { data, error} = await this.supabase.client.auth.signUp({
      email,
      password,
      options: {
        data: { fullName, teamRole: 'member'}
      },
      
      // email_confirm: true,
    });

    if (error) {
      throw new InternalServerErrorException('Registration Failed', error.message);
    }

    return {
      message: 'Registered successfully. Please check for confirmation',
      user: data.user,
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email, 
      password
    });

    if (error) {
      throw new InternalServerErrorException('Login Failed', error.message);
    }

    return {
      message: 'Login successful',
      session: data.session,
      user: data.user
    };
  }
}
