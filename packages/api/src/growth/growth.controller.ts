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
import { CreateGrowthDTO } from './dto/growth.dto';
import { GrowthService } from './growth.service';
import { GrowthInterface } from './interfaces/growth.interface';

@Controller('growth')
export class GrowthController {
  constructor(private growthService: GrowthService) {}

  @Post('/create')
  async createGrowth(
    @Res() res,
    @Body() createGrowthDTO: CreateGrowthDTO,
  ): Promise<GrowthInterface> {
    const growth = await this.growthService.createGrowth(createGrowthDTO);

    if (Object.keys(growth).length === 0) {
      throw new NotFoundException('Growth not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Growth created!',
      success: true,
      growth,
    });
  }

  @Put('/:id')
  async updateGrowth(
    @Res() res,
    @Body() createGrowthDTO: CreateGrowthDTO,
    @Param('id') id: string,
  ): Promise<GrowthInterface> {
    const growth = await this.growthService.updateGrowth(id, createGrowthDTO);

    if (Object.keys(growth).length === 0) {
      throw new NotFoundException('Growth not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Growth updated!',
      success: true,
      growth,
    });
  }

  @Get('/:id')
  async getGrowth(
    @Res() res,
    @Param('id') id: string,
  ): Promise<GrowthInterface> {
    const growth = await this.growthService.getGrowth(id);

    if (Object.keys(growth).length === 0) {
      throw new NotFoundException('Growth not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Growth fetched',
      success: true,
      growth,
    });
  }
}
