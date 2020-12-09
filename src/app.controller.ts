import { Body, Controller,  Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginInput } from './inputs/login.input';
import { LoginOutput } from './outputs/login.output';
import { SignupInput } from './inputs/signup.input';
import { SignupOutput } from './outputs/signup.output';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async login(@Body() loginInput:LoginInput): Promise<LoginOutput> {
    return null;
  }
  @Post('signup')
  async signup(@Body() signupInput:SignupInput): Promise<SignupOutput> {
    await this.appService.signup(signupInput);
    return null;
  }
}
