import { IsString, MinLength, Validate } from 'class-validator';
import { IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(8)
  @Validate(IsStrongPassword)
  password: string;
}
