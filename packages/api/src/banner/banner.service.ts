import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBannerDTO } from './dto/banner.dto';
import { BannerInterface } from './interfaces/banner.interface';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel('Banner')
    private readonly serviceBanner: Model<BannerInterface>,
  ) {}

  async createBanner(
    createBannerDTO: CreateBannerDTO,
  ): Promise<BannerInterface> {
    const banner = new this.serviceBanner(createBannerDTO);
    return await banner.save();
  }

  async deleteBanner(id: string): Promise<BannerInterface> {
    const banner = await this.serviceBanner.findOneAndDelete({ _id: id });
    return banner;
  }

  async getBanners(): Promise<BannerInterface[]> {
    const banners = await this.serviceBanner.find({});
    return banners;
  }

  async getBanner(id: string): Promise<BannerInterface> {
    const banner = await this.serviceBanner.findOne({ _id: id });
    return banner;
  }

  async updateBanner(
    id: string,
    createBannerDTO: CreateBannerDTO,
  ): Promise<BannerInterface> {
    const banner = await this.serviceBanner.findOneAndUpdate(
      { _id: id },
      createBannerDTO,
      { new: true },
    );

    return banner;
  }
}
