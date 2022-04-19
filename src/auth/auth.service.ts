import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../common/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return false;
    }

    if (await user.checkPassword(password)) {
      return user;
    }

    return false;
  }

  async createUser(userData: Partial<User>) {
    const userInDb = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (userInDb) {
      throw new BadRequestException('User already exists');
    }

    const user = this.userRepository.create(userData);

    return this.userRepository.save(user);
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };

    return this.jwtService.sign(payload);
  }

  async verifyPayload(payload): Promise<User> {
    let user: User;

    try {
      user = await this.userRepository.findOne({
        where: { email: payload.sub },
      });
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`,
      );
    }
    delete user.password;

    return user;
  }
}
