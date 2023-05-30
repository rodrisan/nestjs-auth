import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private _usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this._usersService.findByEmail(email);
    const match = await bcrypt.compare(password, user.password);
    if (user && match) {
      return user;
    }
    return null;
  }
}
