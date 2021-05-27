import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionController } from './promotion.controller';
import { PromotionRepository } from './promotion.repository';
import { PromotionService } from './promotion.service';

@Module({
  imports: [TypeOrmModule.forFeature([PromotionRepository])],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule {}
