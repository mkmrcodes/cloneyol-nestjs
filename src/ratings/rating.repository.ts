import { EntityRepository, Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { GetRatingsFilterDto } from './dto/get-ratings-filter.dto';
import { Rating } from './rating.entity';

@EntityRepository(Rating)
export class RatingsRepository extends Repository<Rating> {
  async getRatings(
    getRatingsFilterDto: GetRatingsFilterDto,
  ): Promise<Rating[]> {
    const { search } = getRatingsFilterDto;
    const query = this.createQueryBuilder('rating');

    if (search) {
      query.andWhere('rating.averageRating LIKE :search', {
        search: `%${search}%`,
      });
    }

    const ratings = await query.getMany();
    return ratings;
  }

  async createRating(createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = new Rating();
    const { ratingCount, averageRating } = createRatingDto;
    rating.ratingCount = ratingCount;
    rating.averageRating = averageRating;
    await rating.save();
    return rating;
  }
}
