import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/service/auth.service';
import { LoginDto } from 'src/dto/login.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
