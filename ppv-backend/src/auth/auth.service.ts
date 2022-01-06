import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}
    
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne({email});
        if(user){
          return bcrypt.compare(pass, user.password).then(function(result) {
            if(result)
              {
                const { password, ...user_result } = user;
                return user_result;
              }
            return null;
          });
        }
      }

    async login(user: any) {
        const payload = { user: user };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
