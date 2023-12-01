// import { ApiProperty } from '@nestjs/swagger';
// import {
//   Column,
//   DataType,
//   Table,
//   Model,
//   BelongsTo,
//   ForeignKey,
// } from 'sequelize-typescript';
// import { Portfolio } from './portfolio.model';
// import { Asset } from './asset.model';

// interface PortfolioAssetCreationAttrs {
//   portfolioId: number;
//   assetId: number;
// }

// @Table({ tableName: 'portfolio-asset' })
// export class PortfolioAsset extends Model<
//   PortfolioAsset,
//   PortfolioAssetCreationAttrs
// > {
//   @ApiProperty({ example: '1', description: 'uniq identifier' })
//   @Column({
//     type: DataType.INTEGER,
//     unique: true,
//     autoIncrement: true,
//     primaryKey: true,
//   })
//   id: number;

//   @BelongsTo(() => Portfolio)
//   portfolio: Portfolio;

//   @BelongsTo(() => Asset)
//   asset: Asset;

//   @ForeignKey(() => Portfolio)
//   @Column({
//     type: DataType.INTEGER,
//   })
//   portfolioId: number;

//   @ForeignKey(() => Asset)
//   @Column({
//     type: DataType.INTEGER,
//   })
//   assetId: number;
// }
export {};
