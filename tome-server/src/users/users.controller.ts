import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './../entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Public route: registration
  @Post('register')
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  // Public route: find user by username (for login process)
  @Get('username/:username')
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  // Protected route: get logged-in user details
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  // Protected route: update logged-in user details
  @UseGuards(JwtAuthGuard)
  @Put('me')
  updateProfile(@Request() req, @Body() user: User) {
    return this.usersService.update(req.user.id, user);
  }

  // Protected route: delete logged-in user
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  removeProfile(@Request() req) {
    return this.usersService.remove(req.user.id);
  }
}
