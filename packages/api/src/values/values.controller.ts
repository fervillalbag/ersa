import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateValuesDTO } from './dto/values.dto';
import { ValueInterface } from './interfaces/values.interface';
import { ValuesService } from './values.service';

@Controller('values')
export class ValuesController {
  constructor(private valueService: ValuesService) {}

  @Post('/create')
  async createValue(
    @Res() res,
    @Body() createValuesDTO: CreateValuesDTO,
  ): Promise<ValueInterface> {
    const value = await this.valueService.createValue(createValuesDTO);

    if (Object.keys(value).length === 0) {
      throw new NotFoundException('Value not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Value created!',
      success: true,
      value,
    });
  }

  @Put('/:id')
  async updateValue(
    @Res() res,
    @Body() createValuesDTO: CreateValuesDTO,
    @Param('id') id: string,
  ): Promise<ValueInterface> {
    const value = await this.valueService.updateValue(id, createValuesDTO);

    if (Object.keys(value).length === 0) {
      throw new NotFoundException('Value not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Value updated!',
      success: true,
      value,
    });
  }

  @Delete('/:id')
  async deleteValue(
    @Res() res,
    @Param('id') id: string,
  ): Promise<ValueInterface> {
    const value = await this.valueService.deleteValue(id);

    if (Object.keys(value).length === 0) {
      throw new NotFoundException('Value not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Value deleted!',
      success: true,
      value,
    });
  }

  @Get('/')
  async getValues(@Res() res): Promise<ValueInterface[]> {
    const values = await this.valueService.getValues();

    if (!values) {
      throw new NotFoundException('Value not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Values fetched!',
      success: true,
      values,
    });
  }

  @Get('/:id')
  async getValue(@Res() res, @Param('id') id: string): Promise<ValueInterface> {
    const value = await this.valueService.getValue(id);

    if (Object.keys(value).length === 0) {
      throw new NotFoundException('Value not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Value fetched!',
      success: true,
      value,
    });
  }
}
