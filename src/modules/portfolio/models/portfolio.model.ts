import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Asset } from './asset.model';
import { User } from 'src/modules/users/users.model';

@Table({ tableName: 'portfolios' })
export class Portfolio extends Model<Portfolio> {
  @ApiProperty({ example: '1', description: 'uniq identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @HasMany(() => Asset)
  assets: Asset[];

  @BelongsTo(() => User)
  user: User;
}
