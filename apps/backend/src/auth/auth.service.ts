import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { VerifyUserDto } from './dto/verify.dto';

@Injectable()
export class AuthService {
  constructor(private readonly supabase: SupabaseService) {}

  private generateJwt(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });
  }

  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return decoded;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { fullName, email, password, teamRole } = registerUserDto;

    const { data, error} = await this.supabase.client.auth.signUp({
      email,
      password,
      options: {
        data: { fullName, teamRole: 'member'}
      },
    });

    if (error) {
      throw new InternalServerErrorException('Registration Failed:', error.message);
    }

    const userId = data.user?.id;

    if (!userId) {
      throw new InternalServerErrorException('User ID not found after sign up');
    }

    // insert into profiles table
    const {error: profileError } = await this.supabase.client
    .from('profiles')
    .insert([
      {
        id: userId,
        fullName: fullName,
        email: email,
        teamRole: teamRole || 'member',
      }
    ]);

    if (profileError) {
      throw new InternalServerErrorException('Profile creation failed:' + profileError.message)
    }

    return {
      message: 'Registered successfully. Please check your email for confirmation code',
    }
  }

  async verifyUser(verifyUserDto: VerifyUserDto) {
    const { email, otp } = verifyUserDto;

    const { data, error } = await this.supabase.client.auth.verifyOtp({
      email,
      token: otp,
      type: 'email'
    });

    if (error) {
      throw new InternalServerErrorException('Invalid or expired verification code.', error.message);
    }

    const userId = data.user?.id;

     // Fetch user profile
    const { data: profile, error: profileError } = await this.supabase.client
      .from('profiles')
      .select('*')
      .eq('id', userId) 
      .single();

      if (profileError) {
      throw new InternalServerErrorException('Could not fetch user profile');
    }

    const token = this.generateJwt({
      id: userId,
      email: profile.email,
      teamRole: profile.teamRole,
    });

    return {
      message: 'Verification successful',
      token,
      user: {
        id: userId,
        email: profile.email,
        fullName: profile.fullName,
        teamRole: profile.teamRole,
      }
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

    const userId = data.user.id;

    // Fetch user profile
    const { data: profile, error: profileError } = await this.supabase.client
      .from('profiles')
      .select('*')
      .eq('id', userId) 
      .single();

    if (profileError) {
      throw new InternalServerErrorException('Could not fetch user profile');
    }

    const token = this.generateJwt({
      id: userId,
      email: data.user.email,
      teamRole: profile.teamRole,
    });

    return {
      message: 'Login successful',
      token,
      user: {
        id: userId,
        email: data.user.email,
        fullName: profile.fullName,
        teamRole: profile.teamRole,
      }
    };
  }
}
