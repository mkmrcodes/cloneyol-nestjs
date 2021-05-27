import { EntityRepository, Repository } from 'typeorm';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { GetPromotionsFilterDto } from './dto/get-promotions-filter.dto';
import { Promotion } from './promotion.entity';

@EntityRepository(Promotion)
export class PromotionRepository extends Repository<Promotion> {
  async getPromotions(
    getPromotionsFilterDto: GetPromotionsFilterDto,
  ): Promise<Promotion[]> {
    const { search } = getPromotionsFilterDto;
    const query = this.createQueryBuilder('promotion');

    if (search) {
      query.andWhere('promotion.promotionLabel LIKE :search', {
        search: `%${search}%`,
      });
    }

    const promotions = await query.getMany();
    return promotions;
  }

  async createPromotion(
    createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    const promotion = new Promotion();
    const { promotionLabel, promotionDiscount } = createPromotionDto;
    promotion.promotionLabel = promotionLabel;
    promotion.promotionDiscount = promotionDiscount;

    await promotion.save();
    return promotion;
  }
}
