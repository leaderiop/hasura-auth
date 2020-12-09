import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { ConfigService } from '@nestjs/config';
import { SignupInput } from '../inputs/signup.input';
import { InsertUserQuery, GetUserByUsernameQuery, GetUserByUsernameAndPasswordQuery } from './queries/user.query';
import { LoginOutput } from '../outputs/login.output';
import { UserView } from '../views/user.view';
@Injectable()
export class UserService {
private readonly graphqlUrl:string;
  constructor(private readonly httpService:HttpService,private readonly configService:ConfigService) {
    this.graphqlUrl=this.configService.get("GRAPHQL_URL")
}


  getUserByUsername(username:string):Observable<UserView>{
      return this.httpService.post(this.graphqlUrl,{
          query:GetUserByUsernameQuery,
          variables:{username}
      }).pipe(map((res)=>res.data.data.management_user[0]))
  }
  getUserByUsernameAndPassword(username:string,password:string):Observable<UserView>{
    return this.httpService.post(this.graphqlUrl,{
        query:GetUserByUsernameAndPasswordQuery,
        variables:{username,password}
    }).pipe(map((res)=>res.data.data.management_user[0]))
  }
  createUser(signupInput:SignupInput):Observable<UserView>{
    return this.httpService.post(this.graphqlUrl,{
        query:InsertUserQuery,
        variables:signupInput
    }).pipe(map((res)=>res.data.data.insert_management_user_one))
  }
}
