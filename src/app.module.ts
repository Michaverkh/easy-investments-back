import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './modules/users/users.model';
import { RolesModule } from './modules/roles/roles.module';
import { Role } from './modules/roles/roles.model';
import { UserRoles } from './modules/roles/user-roles.model';
import { AuthModule } from './modules/auth/auth.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { Asset } from './modules/portfolio/models/asset.model';
import { Portfolio } from './modules/portfolio/models/portfolio.model';
import { PortfolioAsset } from './modules/portfolio/models/portfolio-asset.model';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Asset, Portfolio, PortfolioAsset],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PortfolioModule,
  ],
})
export class AppModule {}
