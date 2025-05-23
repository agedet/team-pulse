import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

@Injectable()
export class TeamsService {
    async createTeam(dto: CreateTeamDto) {
        const { name } = dto;

        const { data, error } = await supabase
        .from('teams')
        .insert([{ name }])
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
