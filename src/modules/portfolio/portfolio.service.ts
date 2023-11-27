import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/users.model';

@Injectable()
export class PortfolioService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  //   async addAsset(dto: AddAssetDto) {}
}
