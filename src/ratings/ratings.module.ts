import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingsController } from './ratings.controller';
import { RatingsRepository } from './rating.repository';
import { RatingsService } from './ratings.service';

@Module({
  imports: [TypeOrmModule.forFeature([RatingsRepository])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
