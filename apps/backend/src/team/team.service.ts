import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamService {
    private teams: any[] = [];

    create(dto: CreateTeamDto) {
        const newTeam = { id: Date.now().toString(), ...dto};
        this.teams.push(newTeam);
        return newTeam;
    }
}
