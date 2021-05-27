import { EntityRepository, Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { CartItem } from './cart-item.entity';

@EntityRepository(CartItem)
export class CartItemRepository extends Repository<CartItem> {
  async getCartItemsByCartId(id: string): Promise<CartItem[]> {
    const cartItems = this.createQueryBuilder('cartItems')
      .where('cartItems.cart.id = :id', { id })
      .getMany();
    return cartItems;
  }

  async createCartItem(
    createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    const cartItem = new CartItem();
    const { cart, item, price, quantity, stock } = createCartItemDto;
    cartItem.cart = cart;
    cartItem.item = item;
    cartItem.price = price;
    cartItem.quantity = quantity;
    cartItem.stock = stock;
    await cartItem.save();
    return cartItem;
  }
}
