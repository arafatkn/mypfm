import { Controller, Get } from '@nestjs/common';
import { User } from '../common/entities/user.entity';
import { AuthUser } from './user.decorator';

@Controller('user')
export class UserController {
  @Get('/profile')
  profile(@AuthUser() user: User): User {
    return user;
  }
}
