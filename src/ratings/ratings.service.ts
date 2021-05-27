import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { GetRatingsFilterDto } from './dto/get-ratings-filter.dto';
import { Rating } from './rating.entity';
import { RatingsRepository } from './rating.repository';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingsRepository)
    private ratingRepository: RatingsRepository,
  ) {}

  async getRatingById(id: number): Promise<Rating> {
    const found = await this.ratingRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Rating with ID:${id} not found`);
    }
    return found;
  }

  async getRatings(
    getRatingsFilterDto: GetRatingsFilterDto,
  ): Promise<Rating[]> {
    return this.ratingRepository.getRatings(getRatingsFilterDto);
  }
  async createRating(createRatingDto: CreateRatingDto): Promise<Rating> {
    return this.ratingRepository.createRating(createRatingDto);
  }
  async deleteRating(id: number): Promise<void> {
    const result = await this.ratingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rating with ID:${id} not found`);
    }
  }
  async updateRating(
    id: number,
    createRatingDto: CreateRatingDto,
  ): Promise<Rating> {
    const rating = await this.getRatingById(id);
    const updated = Object.assign(rating, createRatingDto);
    await updated.save();
    return updated;
  }
}
