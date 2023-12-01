import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Portfolio } from './portfolio.model';

interface AssetCreationAttrs {
  portfolioId: number;
  isAsset: boolean;
  name: string;
  valueInPortfolio: number;
  targetShare: number;
  parent?: string;
}

@Table({ tableName: 'assets' })
export class Asset extends Model<Asset, AssetCreationAttrs> {
  @ApiProperty({ example: '1', description: 'uniq identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'cathegory', description: 'type of asset' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @ApiProperty({ example: 'apple', description: 'name of asset' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 1000, description: 'value In Portfolio' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  valueInPortfolio: number;

  @ApiProperty({ example: 1000, description: 'factual Share' })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  factualShare: number;

  @ApiProperty({ example: 1000, description: 'target Share' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  targetShare: number;

  @ApiProperty({ example: 0.5, description: 'rate' })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  rate: number;

  @ApiProperty({ example: 1000, description: 'paymentPerMonth' })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  paymentPerMonth: number;

  @ApiProperty({ example: 'obligations', description: 'parent asset' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  parent: string;

  @BelongsTo(() => Portfolio)
  portfolio: Portfolio;

  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.INTEGER,
  })
  portfolioId: number;
}
