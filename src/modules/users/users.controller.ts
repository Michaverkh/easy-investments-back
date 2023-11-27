import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { SetRolesToMetadata } from 'src/modules/auth/roles-auth.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Receiving all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @SetRolesToMetadata('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Give roles' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @SetRolesToMetadata('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }
}
