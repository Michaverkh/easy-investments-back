import { Injectable } from '@nestjs/common';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.create(dto);
  }

  async getRoleByValue(value: string): Promise<Role> {
    return await this.roleRepository.findOne({ where: { value } });
  }
}
