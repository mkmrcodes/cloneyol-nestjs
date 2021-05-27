import { EntityRepository, Repository } from 'typeorm';
import { BasketItem } from './basketitem.entity';
import { CreateBasketItemDto } from './dto/create-basketitem.dto';

@EntityRepository(BasketItem)
export class BasketItemsRepository extends Repository<BasketItem> {
  async createBasketItem(
    createBasketItemDto: CreateBasketItemDto,
  ): Promise<BasketItem> {
    const basketitem = new BasketItem();
    const { product, basket, qty } = createBasketItemDto;
    basketitem.product = product;
    basketitem.basket = basket;
    basketitem.qty = qty;

    await basketitem.save();
    return basketitem;
  }
}
