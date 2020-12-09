import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
import {genSalt, hash} from 'bcrypt';
import { LoginInput } from './inputs/login.input';
import { LoginOutput } from './outputs/login.output';
import { SignupInput } from './inputs/signup.input';
import { SignupOutput } from './outputs/signup.output';
import { UserService } from './services/user.service';

@Injectable()
export class AppService {

  constructor(private readonly jwtService:JwtService,private readonly userService:UserService) {
  }
  async login(loginInput:LoginInput):Promise<LoginOutput>{
    
    this.jwtService.sign({})
    return null;
    
  }

  async signup(signupInput:SignupInput):Promise<SignupOutput>{
    const oldUser=await this.userService.getUserByUsername(signupInput.username).toPromise();
    if(oldUser) throw new HttpException("Username is already token",HttpStatus.BAD_REQUEST);
    const salt=await genSalt(15);
    signupInput.password=await hash(signupInput.password,salt);
    const user=await this.userService.createUser(signupInput).toPromise();


    
    const loginOutput:LoginOutput={
      user:user,
      "https://hasura.io/jwt/claims":{
        "x-hasura-allowed-roles":["user","admin"],
        "x-hasura-default-role":'admin',
        "x-hasura-user-id":user.id
      }
    }
    const jwt=this.jwtService.sign(loginOutput);
    console.log('jwt is here',jwt);
    return null;
  }
}
