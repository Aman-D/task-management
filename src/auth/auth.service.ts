import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './types/jwt.types';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity> | null {
    const user = await this.userService.findOneByUserName(username);
    if (await bcrypt.compare(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return user;
    }
    return null;
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { username, password } = signUpDto;

    //hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    return this.userService.createUser({ username, password: hashedPassword });
  }

  async signIn(user: UserEntity): Promise<{ access_token: string }> {
    const payload: JWTPayload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
