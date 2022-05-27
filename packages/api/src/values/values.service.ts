import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateValuesDTO } from './dto/values.dto';
import { ValueInterface } from './interfaces/values.interface';

@Injectable()
export class ValuesService {
  constructor(
    @InjectModel('Value') private readonly valueService: Model<ValueInterface>,
  ) {}

  async createValue(createValuesDTO: CreateValuesDTO): Promise<ValueInterface> {
    const value = new this.valueService(createValuesDTO);
    return await value.save();
  }

  async updateValue(
    id: string,
    createValuesDTO: CreateValuesDTO,
  ): Promise<ValueInterface> {
    const value = await this.valueService.findOneAndUpdate(
      { _id: id },
      createValuesDTO,
      { new: true },
    );

    return value;
  }

  async deleteValue(id: string): Promise<ValueInterface> {
    const value = await this.valueService.findOneAndDelete({ id });
    return value;
  }

  async getValues(): Promise<ValueInterface[]> {
    const values = await this.valueService.find({});
    return values;
  }

  async getValue(id: string): Promise<ValueInterface> {
    const value = await this.valueService.findOne({ _id: id });
    return value;
  }
}
