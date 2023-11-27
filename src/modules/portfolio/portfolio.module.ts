import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Asset } from './models/asset.model';
import { Portfolio } from './models/portfolio.model';
import { User } from '../users/users.model';

@Module({
  providers: [PortfolioService],
  controllers: [PortfolioController],
  imports: [SequelizeModule.forFeature([Asset, Portfolio, User])],
})
export class PortfolioModule {}
