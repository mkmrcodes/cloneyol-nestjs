import { IsNotEmpty } from 'class-validator';
import { Brand } from 'src/brand/brand.entity';
import { Category } from 'src/category/category.entity';
import { Merchant } from 'src/merchant/merchant.entity';
import { Promotion } from 'src/promotion/promotion.entity';

export class CreateItemDto {
  @IsNotEmpty()
  code!: string;
  @IsNotEmpty()
  name!: string;
  @IsNotEmpty()
  brand: Brand;
  oldPrice!: number | null;
  @IsNotEmpty()
  price!: number;
  discountRatio: number | null;
  discountPrice: number | null;
  isCargoFree!: boolean;
  @IsNotEmpty()
  image!: string;
  @IsNotEmpty()
  zoomImg!: string;
  @IsNotEmpty()
  category!: Category;
  @IsNotEmpty()
  promotion: Promotion;
  @IsNotEmpty()
  basketLimit!: number;
  stock!: number;
  @IsNotEmpty()
  merchant: Merchant;
}
