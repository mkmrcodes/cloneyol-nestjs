import { IsNotEmpty } from 'class-validator';
import { Basket } from 'src/basket/basket.entity';
import { Item } from 'src/items/item.entity';

export class CreateBasketItemDto {
  @IsNotEmpty()
  product: Item;
  @IsNotEmpty()
  qty: number;
  @IsNotEmpty()
  basket: Basket;
}
