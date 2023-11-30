import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { PortfolioAsset } from './portfolio-asset.model';
import { User } from '../../users/users.model';

interface PortfolioCreationAttrs {
  userId: number;
}

@Table({ tableName: 'portfolios' })
export class Portfolio extends Model<Portfolio, PortfolioCreationAttrs> {
  @ApiProperty({ example: '1', description: 'uniq identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @HasMany(() => PortfolioAsset)
  portfolioAsset: PortfolioAsset[];
}
