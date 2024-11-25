import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body) {
    const { email, password } = body;
    const result = await this.authService.login(email, password);
    return result;
  }
}
