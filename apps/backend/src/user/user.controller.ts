import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { TeamRoles } from 'src/auth/roles.decorator';
import { InviteUserDto } from './dto/invite-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('invite')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @TeamRoles('admin')
    async invite(@Body() inviteUserDto: InviteUserDto) {
        return await this.userService.inviteUser(inviteUserDto);
    }
}
