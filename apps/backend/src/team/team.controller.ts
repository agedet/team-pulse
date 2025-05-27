import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TeamsService } from './team.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamRoles } from 'src/auth/roles.decorator';
import { UpdateMemberStatusDto } from './dto/update-status.dto';

@Controller('team')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @Post('create-team')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @TeamRoles('admin')
    async create(@Body() createTeamDto: CreateTeamDto) {
        return await this.teamsService.createTeam(createTeamDto);
    }

    @Post('status')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @TeamRoles('member')
    async updateStatus(@Body() updateMemberStatusDto: UpdateMemberStatusDto, @Req() req: any) {
        const userId = req.user.id;
        return await this.teamsService.updateMemberStatus(userId, updateMemberStatusDto);
    }

}
