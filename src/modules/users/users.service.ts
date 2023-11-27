import { AddRoleDto } from './dto/add-role.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/modules/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');

    await user.$set('roles', [role.id]);
    user.roles = [role];

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }

  async addRole(dto: AddRoleDto): Promise<void> {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      // Здесь используем add, т.к. мы добавляем инстанс в уже созданный массив.
      //Если такого поля еще нет, используем $set
      await user.$add('role', role.id);
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  // async ban(dto: BanUserDto) {}
}
