import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { BannerService } from './banner.service';
import { CreateBannerDTO } from './dto/banner.dto';
import { BannerInterface } from './interfaces/banner.interface';

@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @Post('/create')
  async createBanner(
    @Res() res,
    @Body() createBannerDTO: CreateBannerDTO,
  ): Promise<BannerInterface> {
    const banner = await this.bannerService.createBanner(createBannerDTO);

    if (Object.keys(banner).length === 0) {
      throw new NotFoundException('Banner not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Banner created!',
      success: true,
      banner,
    });
  }

  @Delete('/:id')
  async deleteBanner(
    @Res() res,
    @Param('id') id: string,
  ): Promise<BannerInterface> {
    const banner = await this.bannerService.deleteBanner(id);

    if (Object.keys(banner).length === 0) {
      throw new NotFoundException('Banner not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Banner deleted!',
      success: true,
      banner,
    });
  }

  @Get('/')
  async getBanners(@Res() res): Promise<BannerInterface> {
    const banners = await this.bannerService.getBanners();

    if (!banners) {
      throw new NotFoundException('Banner not found!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Banners fetched!',
      success: true,
      banners,
    });
  }

  @Get('/:id')
  async getBanner(
    @Res() res,
    @Param('id') id: string,
  ): Promise<BannerInterface> {
    const banner = await this.bannerService.getBanner(id);

    if (Object.keys(banner).length === 0) {
      throw new NotFoundException('Banner not found!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Banner fetched!',
      success: true,
      banner,
    });
  }
}
