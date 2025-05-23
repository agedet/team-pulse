import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TeamsService } from './team.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async create(@Body() createTeamDto: CreateTeamDto) {
        return await this.teamsService.createTeam(createTeamDto);
    }

}
