import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('team')
export class TeamController {
    constructor(private readonly teamsService: TeamService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    create(@Body() createTeamDto: CreateTeamDto) {
        return this.teamsService.create(createTeamDto);
    }

}
