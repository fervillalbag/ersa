import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateReviewDTO } from './dto/review.dto';
import { ReviewInterface } from './interfaces/review.interface';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<ReviewInterface>,
  ) {}

  async createReview(
    createReviewDTO: CreateReviewDTO,
  ): Promise<ReviewInterface> {
    const review = new this.reviewModel(createReviewDTO);
    return await review.save();
  }

  async updateReview(
    id: string,
    createReviewDTO: CreateReviewDTO,
  ): Promise<ReviewInterface> {
    const review = await this.reviewModel.findOneAndUpdate(
      { id },
      createReviewDTO,
      { new: true },
    );
    return review;
  }

  async deleteReview(id: string): Promise<ReviewInterface> {
    const review = await this.reviewModel.findOneAndDelete({ id });
    return review;
  }

  async getReviews(): Promise<ReviewInterface[]> {
    const reviews = await this.reviewModel.find({});
    return reviews;
  }

  async getReview(id: string): Promise<ReviewInterface> {
    const review = await this.reviewModel.findOne({ id });
    return review;
  }
}
