import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InviteUserDto } from './dto/invite-user.dto';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

@Injectable()
export class UserService {
    async inviteUser(dto: InviteUserDto) {
        const {email, role, teamId} = dto;

        const { data, error } = await supabase.auth.admin.createUser({
            email,
            user_metadata: { role, teamId},
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