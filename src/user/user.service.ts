import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  async findOneByUserName(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
