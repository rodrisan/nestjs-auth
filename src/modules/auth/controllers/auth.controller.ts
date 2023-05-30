import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { User } from '../../database/entities/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  login(@Req() req: Request) {
    const user = req.user as User;
    return this._authService.generateJwt(user);
  }
}
