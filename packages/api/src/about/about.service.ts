import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAboutDTO } from './dto/about.dto';
import { AboutInterface } from './interfaces/about.interface';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel('About') private readonly aboutModel: Model<AboutInterface>,
  ) {}

  async createAbout(createAboutDTO: CreateAboutDTO): Promise<AboutInterface> {
    const about = new this.aboutModel(createAboutDTO);
    return await about.save();
  }

  async updateAbout(
    id: string,
    createAboutDTO: CreateAboutDTO,
  ): Promise<AboutInterface> {
    const about = await this.aboutModel.findOneAndUpdate(
      { id },
      createAboutDTO,
      { new: true },
    );
    return about;
  }

  async getAbout(): Promise<AboutInterface> {
    const about = await this.aboutModel.findOne({});
    return about;
  }
}
