import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TeamsService } from './team.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
    async updateStatus(@Body() updateMemberStatusDto: UpdateMemberStatusDto, @Req() req: any) {
        const userId = req.user.id;
        return await this.teamsService.updateMemberStatus(userId, updateMemberStatusDto);
    }

    @Get('members')
    async getTeamMembers(@Req() req: any) {
        const userId = req.user.id;
        return this.teamsService.getTeamMembers(userId)
    }

}
