import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { GetRatingsFilterDto } from './dto/get-ratings-filter.dto';
import { Rating } from './rating.entity';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  private logger = new Logger('RatingsController');
  constructor(private ratingsService: RatingsService) {}

  @Get('/:id')
  getRatingById(@Param('id', ParseIntPipe) id: number): Promise<Rating> {
    this.logger.verbose(`Retrieving rating with id: ${id}`);
    return this.ratingsService.getRatingById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createRating(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    this.logger.verbose(`Creating rating`);
    return this.ratingsService.createRating(createRatingDto);
  }

  @Delete('/:id')
  deleteRating(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.logger.verbose(`Deleting rating with id: ${id}`);
    return this.ratingsService.deleteRating(id);
  }

  @Patch('/:id')
  updateRating(
    @Param('id', ParseIntPipe) id: number,
    @Body() createRatingDto: CreateRatingDto,
  ): Promise<Rating> {
    this.logger.verbose(`Updating rating with id: ${id}`);
    return this.ratingsService.updateRating(id, createRatingDto);
  }

  @Get('')
  getRatings(
    @Query(ValidationPipe) getRatingsFilterDto: GetRatingsFilterDto,
  ): Promise<Rating[]> {
    this.logger.verbose(
      `Retrieving all ratings. Filter: ${JSON.stringify(getRatingsFilterDto)}`,
    );
    return this.ratingsService.getRatings(getRatingsFilterDto);
  }
}
