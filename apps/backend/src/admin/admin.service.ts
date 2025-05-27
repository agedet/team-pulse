import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { InviteUserDto } from 'src/user/dto/invite-user.dto';

@Injectable()
export class AdminService {
    constructor(private readonly supabase: SupabaseService) {}

    async createTeam(createTeamDto: CreateTeamDto) {
        const { teamName, teamId} = createTeamDto;

        const { data, error } = await this.supabase.client
            .from('teams')
            .insert([{ teamName, teamId }])
            .select();

        if (error) {
            throw new InternalServerErrorException('Failed to create team', error.message);
        }

        return data;
    }

    async inviteUser(inviteUserDto: InviteUserDto) {
        const { email, teamId, teamRole } = inviteUserDto;

        const { data, error } = await this.supabase.client
            .from('invitations')
            .insert([{ 
                email, 
                teamId, 
                teamRole, 
            }])
            .select();

        if (error) {
            throw new InternalServerErrorException('Failed to invite user', error.message);
        }

        return data;
    }
}
