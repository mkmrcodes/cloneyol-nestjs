import { IsNotEmpty } from 'class-validator';
import { Cart } from 'src/cart/cart.entity';
import { Item } from 'src/items/item.entity';

export class CreateCartItemDto {
  @IsNotEmpty()
  cart: Cart;
  @IsNotEmpty()
  item: Item;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  stock: number;
}
