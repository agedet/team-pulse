import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InviteUserDto } from './dto/invite-user.dto';
import { SupabaseService } from 'src/supabase/supabase.service';


@Injectable()
export class UserService {
    constructor(private readonly supabase: SupabaseService) {}

    async inviteUser(dto: InviteUserDto) {
        const {email, teamRole, teamId} = dto;

        const { data, error } = await this.supabase.client.auth.admin.createUser({
            email,
            user_metadata: { teamRole, teamId },
            email_confirm: true
        });

        if (error) {
            throw new InternalServerErrorException('Failed to invite user', error.message);
        }

        return {
            message: 'User invited successfully',
            user: data.user,
        };
    }
}