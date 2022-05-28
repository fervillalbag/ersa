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
import { CommunityService } from './community.service';
import { CreateCommunityDTO } from './dto/community.dto';
import { CommunityInterface } from './interfaces/community.interface';

@Controller('community')
export class CommunityController {
  constructor(private communityService: CommunityService) {}

  @Post('/create')
  async createCommunityInfo(
    @Res() res,
    @Body() createCommunityDTO: CreateCommunityDTO,
  ): Promise<CommunityInterface> {
    const community = await this.communityService.createCommunityInfo(
      createCommunityDTO,
    );

    if (Object.keys(community).length === 0) {
      throw new NotFoundException('Community info not found!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Community info created!',
      success: true,
      community,
    });
  }

  @Put('/:id')
  async updateCommunityInfo(
    @Res() res,
    @Body() createCommunityDTO: CreateCommunityDTO,
    @Param('id') id: string,
  ): Promise<CommunityInterface> {
    const community = await this.communityService.updateCommunityInfo(
      id,
      createCommunityDTO,
    );

    if (Object.keys(community).length === 0) {
      throw new NotFoundException('Community info not found!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Community info updated!',
      success: true,
      community,
    });
  }

  @Get('/:id')
  async getCommunityInfo(
    @Res() res,
    @Param('id') id: string,
  ): Promise<CommunityInterface> {
    const community = await this.communityService.getCommunityInfo(id);

    if (Object.keys(community).length === 0) {
      throw new NotFoundException('Community info not found!');
    }

    return res.status(HttpStatus.OK).json({
      message: '',
      success: true,
      community,
    });
  }
}
