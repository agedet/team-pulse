import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as jwt from "jsonwebtoken";
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

const supabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);

@Injectable()
export class AuthService {
  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return decoded;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async registerUser(dto: RegisterUserDto) {
    const { fullName, email, password, role, teamId } = dto;

    const { data, error} = await supabaseClient.auth.admin.createUser({
        email,
        password,
        user_metadata: { fullName, role, teamId},
        email_confirm: true
    });

    if (error) {
        throw new InternalServerErrorException('Registration Failed', error.message);
    }

    return {
        message: 'Registered successfully. Please check for confirmation',
        user: data.user,
    }
  }

  async loginUser(dto: LoginUserDto) {
    const { email, password } = dto;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email, password
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
