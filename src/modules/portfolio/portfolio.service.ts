import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Asset } from './models/asset.model';
import { AddAssetDto } from './dto/create-asset.dto';
import { Portfolio } from './models/portfolio.model';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Asset) private assetRepository: typeof Asset,
    @InjectModel(Portfolio) private portfolioRepository: typeof Portfolio,
  ) {}

  async addAsset(addAssetDto: AddAssetDto): Promise<Asset[]> {
    const userId = addAssetDto.userId;
    try {
      let portfolio = await this.portfolioRepository.findOne({
        where: { userId },
      });

      if (!portfolio) {
        portfolio = await this.portfolioRepository.create({
          userId: addAssetDto.userId,
        });
      }

      await this.assetRepository.create({
        ...addAssetDto,
        portfolioId: portfolio.id,
      });

      const assets = await this.assetRepository.findAll({
        where: { portfolioId: portfolio.id },
      });

      // assets.forEach((asset) => {
      //   asset.valueInPortfolio = 1000;

      //   asset.save();
      // });

      return assets;
    } catch (error) {
      console.log('add asset error', error.message);
    }
  }
}
