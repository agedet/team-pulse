import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UpdateMemberStatusDto } from './dto/update-status.dto';


@Injectable()
export class TeamsService {
    constructor(private readonly supabase: SupabaseService) {}

    async createTeam(createTeamDto: CreateTeamDto) {
        const { teamName, teamId } = createTeamDto;

        const { data, error } = await this.supabase.client
        .from('teams')
        .insert([{ teamName, teamId }])
        .select();

        if (error) {
            throw new InternalServerErrorException('Failed to create team', error.message);
        }

        return {
            message: 'Team created successfuly',
            team: data[0],
        };
    }

    async updateMemberStatus(userId, updateMemberStatusDto: UpdateMemberStatusDto) {
        const { newStatus } = updateMemberStatusDto;

        const { data:profile, error:profileError } = await this.supabase.client
        .from('profiles')
        .select('id, teamRole, teamId')
        .eq('id', userId)
        .single();

        if (profileError || !profile) {
            throw new InternalServerErrorException('Profile not found', profileError.message);
        }

        if (profile.teamRole !== 'member') {
            throw new Error('Only members can update their status');
        }

        const { error: updateProfileError } = await this.supabase.client
        .from('profiles')
        .update({status: newStatus})
        .eq('id', userId);

        if (updateProfileError) {
            throw new InternalServerErrorException('Failed to update profile status', updateProfileError.message);
        }

        // update team members status in the team
        const { data: team, error: teamError } = await this.supabase.client
        .from('teams')
        .select('id, status')
        .eq('id', profile.teamId)
        .single();

        if (teamError || !team) {
            throw new InternalServerErrorException('Team not found', teamError.message);
        } 

        const updatedStatus = {
            ...team.status,
            [userId]: newStatus,
        }

        const { error: updateTeamError } = await this.supabase.client
        .from('teams')
        .update({ status: updatedStatus })
        .eq('id', team.id);

        if (updateTeamError) {
            throw new InternalServerErrorException('Failed to update team member status');
        }

        return {
            message: 'Status updated successfully'
        }
    }

    async getTeamMembers(userId: string) {
        const { data: profile, error: profileError } = await this.supabase.client
        .from('profiles')
        .select('teamId')
        .eq('id', userId)
        .single();

        if (profileError || !profile?.teamId) {
            throw new NotFoundException('Team not found');
        }

        const { data: members, error } = await this.supabase.client
        .from('profiles')
        .select('id, fullName, email, status, teamRole')
        .eq('teamId', profile.teamId);

        if (error) {
            throw new InternalServerErrorException('Could not fetch team members');
        }

        return members;
    }
}
