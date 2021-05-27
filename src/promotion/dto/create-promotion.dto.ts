import { IsNotEmpty } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  promotionLabel!: string;
  @IsNotEmpty()
  promotionDiscount!: number;
}
