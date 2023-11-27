import { SequelizeModule } from '@nestjs/sequelize';
import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Role } from 'src/modules/roles/roles.model';
import { UserRoles } from 'src/modules/roles/user-roles.model';
import { RolesModule } from 'src/modules/roles/roles.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Portfolio } from '../portfolio/models/portfolio.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Portfolio]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
