import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateHeaderDTO } from './dto/header.dto';
import { HeaderInterface } from './interfaces/header.interface';

@Injectable()
export class HeaderService {
  constructor(
    @InjectModel('Header') private readonly headerModel: Model<HeaderInterface>,
  ) {}

  async createHeader(
    createHeaderDTO: CreateHeaderDTO,
  ): Promise<HeaderInterface> {
    const newHeaderInfo = new this.headerModel(createHeaderDTO);
    return await newHeaderInfo.save();
  }

  async updateHeader(
    id: string,
    createHeaderDTO: CreateHeaderDTO,
  ): Promise<HeaderInterface> {
    const header = await this.headerModel.findOneAndUpdate(
      { _id: id },
      createHeaderDTO,
      { new: true },
    );
    return header;
  }

  async getHeader(): Promise<HeaderInterface> {
    const header = await this.headerModel.findOne({});
    return header;
  }
}
