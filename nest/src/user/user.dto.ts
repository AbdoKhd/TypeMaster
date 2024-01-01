import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { IsLengthAndNoSpecialChars } from '../decorators/check.length.chars';

/**
 * DTO class for user creation
 */
export class CreateUserDto {
  @IsLengthAndNoSpecialChars(4, 20)
  username?: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password_hash: string;

  constructor(
    username: string,
    email: string,
    password: string,
  ) {
    this.username = username;
    this.email = email;
    this.password_hash = password;
  }
}

/**
 * Dto class for user update
 */
export class UpdateUserDto {
  @IsLengthAndNoSpecialChars(4, 20)
  username?: string;

  @IsEmail()
  email?: string;

  @IsStrongPassword()
  password_hash?: string;

  constructor(
    username: string,
    email: string,
    password: string,
  ) {
    this.username = username;
    this.email = email;
    this.password_hash = password;
  }
}