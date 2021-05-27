import { EntityRepository, Repository } from 'typeorm';
import { CreateBasketDto } from './dto/create-basket.dto';
import { Basket } from './basket.entity';

@EntityRepository(Basket)
export class BasketRepository extends Repository<Basket> {
  async createBasket(createBasketDto: CreateBasketDto): Promise<Basket> {
    const basket = new Basket();
    const { items } = createBasketDto;
    basket.items = items;
    await basket.save();
    return basket;
  }
}
