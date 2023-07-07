import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserSign } from 'src/Services/auth/Dto/userSign';
import { AuthService } from 'src/Services/auth/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() model: UserSign): Promise<{ token: string }> {
    return this.authService.signUp(model);
  }

  @Post('/login')
  async login(@Body() model: UserSign): Promise<{ token: string }> {
    return this.authService.login(model);
  }
}
