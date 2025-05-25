import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TeamRoles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AdminService } from './admin.service';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { InviteUserDto } from 'src/user/dto/invite-user.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@TeamRoles('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('create-team')
    createTeam(@Body() CreateTeamDto: CreateTeamDto) {
        return this.adminService.createTeam(CreateTeamDto);
    }

    @Post('invite') 
    inviteUser(@Body() inviteUserDto: InviteUserDto) {
        return this.adminService.inviteUser(inviteUserDto);
    }
}
