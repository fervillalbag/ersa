import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCommunityDTO } from './dto/community.dto';
import { CommunityInterface } from './interfaces/community.interface';

@Injectable()
export class CommunityService {
  constructor(
    @InjectModel('Community')
    private readonly communityModel: Model<CommunityInterface>,
  ) {}

  async createCommunityInfo(
    createCommunityDTO: CreateCommunityDTO,
  ): Promise<CommunityInterface> {
    const community = new this.communityModel(createCommunityDTO);
    return await community.save();
  }

  async updateCommunityInfo(
    id: string,
    createCommunityDTO: CreateCommunityDTO,
  ): Promise<CommunityInterface> {
    const community = await this.communityModel.findOneAndUpdate(
      { _id: id },
      createCommunityDTO,
      { new: true },
    );
    return community;
  }

  async getCommunityInfo(id: string): Promise<CommunityInterface> {
    const community = await this.communityModel.findOne({ _id: id });
    return community;
  }
}
