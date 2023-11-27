import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/modules/users/users.model';
import { EServerErrors } from 'src/exceptions/enums';

/*
  В дальнейшем упростить сервис с помощью Pasport js
*/

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto): Promise<{ token: string }> {
    const user = await this.validateUser(userDto);

    return await this.generateToken(user);
  }

  async registration(userDto: CreateUserDto): Promise<{ token: string }> {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'пользователь с данным email уже существует',
        EServerErrors.USER_ALREADY_EXISTS,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User): Promise<{ token: string }> {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: CreateUserDto): Promise<User> {
    const user = await this.userService.getUserByEmail(userDto.email);
    const isPasswordsEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && isPasswordsEquals) {
      return user;
    }

    if (!user) {
      throw new HttpException('неверный email', EServerErrors.INCORRECT_EMAIL);
    }

    if (user && !isPasswordsEquals) {
      throw new HttpException(
        'неверный пароль',
        EServerErrors.INCORRECT_PASSWORD,
      );
    }

    throw new HttpException(
      'ошибка сервера',
      EServerErrors.COMMON_SERVER_ERROR,
    );
  }
}
