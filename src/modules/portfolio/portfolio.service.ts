import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Asset } from './models/asset.model';
import { AddAssetDto } from './dto/create-asset.dto';
import { Portfolio } from './models/portfolio.model';
import { PortfolioAsset } from './models/portfolio-asset.model';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Asset) private assetRepository: typeof Asset,
    @InjectModel(Portfolio) private portfolioRepository: typeof Portfolio,
    @InjectModel(PortfolioAsset)
    private portfolioAssetRepository: typeof PortfolioAsset,
  ) {}

  async addAsset(addAssetDto: AddAssetDto): Promise<Portfolio> {
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

      const asset = await this.assetRepository.create(addAssetDto);

      await this.portfolioAssetRepository.create({
        assetId: asset.id,
        portfolioId: portfolio.id,
      });

      return portfolio;
    } catch (error) {
      console.log('add asset error', error.message);
    }
  }
}
