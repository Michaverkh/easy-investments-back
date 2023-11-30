import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from './models/portfolio.model';
import { AddAssetDto } from './dto/create-asset.dto';

@ApiTags('Portfolio')
@Controller('assets')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @ApiOperation({ summary: 'Asset creation' })
  @ApiResponse({ status: 200, type: Portfolio })
  @UsePipes(ValidationPipe)
  @Post('/add')
  create(@Body() assetDto: AddAssetDto) {
    return this.portfolioService.addAsset(assetDto);
  }
}
