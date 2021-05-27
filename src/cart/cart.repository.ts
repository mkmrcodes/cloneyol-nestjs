import { EntityRepository, Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './cart.entity';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  async getCartByUserId(id: string): Promise<Cart> {
    const cart = this.createQueryBuilder('cart')
      .where('cart.user.userId = :userId', { userId: id })
      .getOne();
    return cart;
  }

  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    const cart = new Cart();
    const { isPurchased, price, paidPrice, profile, items } = createCartDto;
    cart.isPurchased = isPurchased;
    cart.price = price;
    cart.paidPrice = paidPrice;
    cart.profile = profile;
    cart.items = items;
    await cart.save();
    return cart;
  }
}
