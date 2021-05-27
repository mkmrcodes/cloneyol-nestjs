import { IsNotEmpty, IsOptional } from 'class-validator';
import { CartItem } from 'src/cart-item/cart-item.entity';
import { Profile } from 'src/profile/profile.entity';

export class CreateCartDto {
  isPurchased!: boolean;
  @IsNotEmpty()
  price!: number;
  @IsNotEmpty()
  paidPrice: number;
  @IsNotEmpty()
  profile: Profile;
  items: CartItem[];
}
