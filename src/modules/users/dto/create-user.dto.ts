import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'batya@fmail.or', description: 'email' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Should be a email' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'password' })
  @IsString({ message: 'Should be a string' })
  @Length(4, 16, { message: 'No less then 4 and no more then 16' })
  readonly password: string;
}
