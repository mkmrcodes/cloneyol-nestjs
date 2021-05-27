import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { Promotion } from './promotion.entity';
import { PromotionRepository } from './promotion.repository';
import { GetPromotionsFilterDto } from './dto/get-promotions-filter.dto';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(PromotionRepository)
    private promotionRepository: PromotionRepository,
  ) {}

  async getPromotions(
    getPromotionsFilterDto: GetPromotionsFilterDto,
  ): Promise<Promotion[]> {
    return this.promotionRepository.getPromotions(getPromotionsFilterDto);
  }

  async getPromotionById(id: number): Promise<Promotion> {
    const found = await this.promotionRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Promotion with ID:${id} not found`);
    }
    return found;
  }

  async createPromotion(
    createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    return this.promotionRepository.createPromotion(createPromotionDto);
  }
  async deletePromotion(id: number): Promise<void> {
    const result = await this.promotionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Promotion with ID:${id} not found`);
    }
  }
  async updatePromotion(
    id: number,
    createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    const promotion = await this.getPromotionById(id);
    const updated = Object.assign(promotion, createPromotionDto);
    await updated.save();
    return updated;
  }
}
