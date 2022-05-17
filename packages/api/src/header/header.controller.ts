import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { CreateHeaderDTO } from './dto/header.dto';
import { HeaderService } from './header.service';
import { HeaderInterface } from './interfaces/header.interface';

@Controller('header')
export class HeaderController {
  constructor(private headerService: HeaderService) {}

  @Post('/create')
  async createHeader(
    @Res() res,
    @Body() createHeaderDTO: CreateHeaderDTO,
  ): Promise<HeaderInterface> {
    const header = await this.headerService.createHeader(createHeaderDTO);

    if (Object.keys(header).length === 0) {
      throw new NotFoundException('Header not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Header fetched!',
      success: true,
      header,
    });
  }

  @Put('/:id')
  async updateHeader(
    @Res() res,
    @Body() createHeaderDTO: CreateHeaderDTO,
    @Param('id') id: string,
  ): Promise<HeaderInterface> {
    const header = await this.headerService.updateHeader(id, createHeaderDTO);

    if (Object.keys(header).length === 0) {
      throw new NotFoundException('Header not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Header fetched!',
      success: true,
      header,
    });
  }

  @Get('/')
  async getHeader(): Promise<HeaderInterface> {
    const header = await this.headerService.getHeader();

    if (Object.keys(header).length === 0) {
      throw new NotFoundException('Header not found');
    }

    return header;
  }
}
