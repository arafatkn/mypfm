import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    const user = await this.authService.login(
      loginData.email,
      loginData.password,
    );

    if (!user) {
      throw new UnauthorizedException('Email or Password is not correct!');
    }

    return {
      user,
      token: this.authService.signToken(user),
    };
  }

  @Post('register')
  register(@Body() registerData: RegisterDto) {
    return this.authService.createUser(registerData);
  }
}
