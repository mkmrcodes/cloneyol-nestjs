import { IsNotEmpty, IsOptional } from 'class-validator';
import { BasketItem } from 'src/basketitems/basketitem.entity';

export class CreateBasketDto {
  @IsOptional()
  @IsNotEmpty()
  items: BasketItem[];
  @IsOptional()
  @IsNotEmpty()
  profileId: string;
}
