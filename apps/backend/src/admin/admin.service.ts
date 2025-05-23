import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { InviteUserDto } from 'src/user/dto/invite-user.dto';

@Injectable()
export class AdminService {
    constructor(private readonly supabase: SupabaseService) {}

    async createTeam(createTeamDto: CreateTeamDto) {
        const { data, error } = await this.supabase.client
            .from('teams')
            .insert([{ name: createTeamDto.name }])
            .select();

        if (error) throw new Error(error.message);
        return data;
    }

    async inviteUser(inviteUserDto: InviteUserDto) {
        const { data, error } = await this.supabase.client
            .from('invitations')
            .insert([{ 
                email: inviteUserDto.email, 
                team_id: inviteUserDto.teamId, 
                role: inviteUserDto.role 
            }])
            .select();

        if (error) throw new Error(error.message);
        return data;
    }


}
