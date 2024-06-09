import {
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(4)
  @NotContains(' ')
  username: string;

  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message:
        'Password does not meet the requirements. Please choose a password that is at least 8 characters long and includes at least one uppercase letter, one lowercase letter, one digit, and one special character from the set [@$!%*?&].',
    },
  )
  password: string;
}
