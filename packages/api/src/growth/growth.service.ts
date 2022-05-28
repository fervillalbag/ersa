import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGrowthDTO } from './dto/growth.dto';

import { GrowthInterface } from './interfaces/growth.interface';

@Injectable()
export class GrowthService {
  constructor(
    @InjectModel('Growth')
    private readonly growthService: Model<GrowthInterface>,
  ) {}

  async createGrowth(
    createGrowthDTO: CreateGrowthDTO,
  ): Promise<GrowthInterface> {
    const growth = new this.growthService(createGrowthDTO);
    return await growth.save();
  }

  async updateGrowth(
    id: string,
    createGrowthDTO: CreateGrowthDTO,
  ): Promise<GrowthInterface> {
    const growth = await this.growthService.findOneAndUpdate(
      { id },
      createGrowthDTO,
      { new: true },
    );
    return growth;
  }

  async getGrowth(id: string): Promise<GrowthInterface> {
    const growth = await this.growthService.findOne({ _id: id });
    return growth;
  }
}
