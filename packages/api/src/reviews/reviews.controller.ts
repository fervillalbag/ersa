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

import { CreateReviewDTO } from './dto/review.dto';
import { ReviewInterface } from './interfaces/review.interface';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Post('/create')
  async createReview(
    @Res() res,
    @Body() createReviewDTO: CreateReviewDTO,
  ): Promise<ReviewInterface> {
    const review = await this.reviewService.createReview(createReviewDTO);

    if (Object.keys(review).length === 0) {
      throw new NotFoundException('Review not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Review created!',
      success: true,
      review,
    });
  }

  @Put('/:id')
  async updateReview(
    @Res() res,
    @Body() createReviewDTO: CreateReviewDTO,
    @Param('id') id: string,
  ): Promise<ReviewInterface> {
    const review = await this.reviewService.updateReview(id, createReviewDTO);

    if (Object.keys(review).length === 0) {
      throw new NotFoundException('Review not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Review updated!',
      success: true,
      review,
    });
  }

  @Get('/')
  async getReviews(@Res() res): Promise<ReviewInterface[]> {
    const reviews = await this.reviewService.getReviews();

    if (!reviews) {
      throw new NotFoundException('Review not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Reviews fetched!',
      success: true,
      reviews,
    });
  }

  @Get('/:id')
  async getReview(
    @Res() res,
    @Param('id') id: string,
  ): Promise<ReviewInterface> {
    const review = await this.reviewService.getReview(id);

    if (Object.keys(review).length === 0) {
      throw new NotFoundException('Review not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Review fetched!',
      success: true,
      review,
    });
  }

  @Delete('/:id')
  async deleteReview(
    @Res() res,
    @Param('id') id: string,
  ): Promise<ReviewInterface> {
    const review = await this.reviewService.deleteReview(id);

    if (Object.keys(review).length === 0) {
      throw new NotFoundException('Review not found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Review deleted!',
      sucesss: true,
      review,
    });
  }
}
