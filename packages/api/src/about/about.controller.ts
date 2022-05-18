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

import { AboutService } from './about.service';
import { CreateAboutDTO } from './dto/about.dto';
import { AboutInterface } from './interfaces/about.interface';

@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Post('/create')
  async createAbout(
    @Res() res,
    @Body() createAboutDTO: CreateAboutDTO,
  ): Promise<AboutInterface> {
    const about = await this.aboutService.createAbout(createAboutDTO);

    if (Object.keys(about).length === 0) {
      throw new NotFoundException('About info not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'About created!',
      success: true,
      about,
    });
  }

  @Put('/:id')
  async updateAbout(
    @Res() res,
    @Param('id') id: string,
    @Body() createAboutDTO: CreateAboutDTO,
  ): Promise<AboutInterface> {
    const about = await this.aboutService.updateAbout(id, createAboutDTO);

    if (Object.keys(about).length === 0) {
      throw new NotFoundException('About info not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'About updated!',
      success: true,
      about,
    });
  }

  @Get('/')
  async getAbout(@Res() res): Promise<AboutInterface> {
    const about = await this.aboutService.getAbout();

    if (Object.keys(about).length === 0) {
      throw new NotFoundException('About info not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'About info fetched!',
      success: true,
      about,
    });
  }
}
