import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { SupabaseService } from 'src/supabase/supabase.service';


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
}
