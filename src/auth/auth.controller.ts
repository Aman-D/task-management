import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './gaurds/local.auth-gaurd';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }
}
