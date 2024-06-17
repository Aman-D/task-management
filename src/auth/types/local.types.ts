import { UserEntity } from 'src/user/entities/user.entity';

export type ValidatedUser = Omit<UserEntity, 'password'>;
