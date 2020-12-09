import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    })
    ,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        headers:{
          ["X-Hasura-Admin-Secret"]:configService.get("X_Hasura_Admin_Secret")
        }
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({ 
      secret: '3EK6FD+o0+c7tzBNVfjpMkNDi2yARAAKzQlk8O2IKoxQu4nF7EdAh8s3TwpHwrdWT6R'
    })],
  controllers: [AppController],
  providers: [AppService,UserService],
})
export class AppModule {}
