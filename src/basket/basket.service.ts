import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBasketDto } from './dto/create-basket.dto';
import { Basket } from './basket.entity';
import { BasketRepository } from './basket.repository';
import { JobsDto } from './dto/jobs-basket.dto';
import { getRepository } from 'typeorm';
import { BasketItem } from 'src/basketitems/basketitem.entity';
//import { JobsDto } from './dto/jobs-basket.dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketRepository)
    private basketRepository: BasketRepository,
  ) {}

  async getBasketById(id: string): Promise<Basket> {
    const found = await this.basketRepository.findOne({
      where: { id: id },
      relations: ['items'],
    });
    if (!found) {
      throw new NotFoundException(`Basket with ID:${id} not found`);
    }
    return found;
  }
  async getBasketByProfileId(id: string): Promise<Basket> {
    const found = await this.basketRepository.findOne({
      where: { profileId: id },
      relations: ['items'],
    });
    if (!found) {
      throw new NotFoundException(`Basket with profile id:${id} not found`);
    }
    return found;
  }

  // async addItem(jobsDto: JobsDto): Promise<Basket> {
  //   const basket2Add = await this.basketRepository.findOne(jobsDto.id);
  //   if (!basket2Add) {
  //     throw new NotFoundException(`Basket with ID:${jobsDto.id} not found`);
  //   }
  //   //console.log(basket2Add);

  //   const item2Add = await this.itemRepository.findOne(jobsDto.itemId);
  //   if (!item2Add) {
  //     throw new NotFoundException(`Item with ID:${jobsDto.itemId} not found`);
  //   }
  //   basket2Add.items.push(item2Add);
  //   await basket2Add.save();
  //   return basket2Add;

  //   // if (basket2Add.items.some((item) => item.id === item2Add.id)) {
  //   //   const index = basket2Add.items.findIndex(
  //   //     (item) => item.id === item2Add.id,
  //   //   );
  //   //   console.log(basket2Add.items[index].qty);

  //   //   basket2Add.items[index].qty = basket2Add.items[index].qty + 1;
  //   //   const x = await basket2Add.save();
  //   //   console.log(x);

  //   //   return basket2Add;
  //   // } else {
  //   //   basket2Add.items.push(item2Add);
  //   //   await basket2Add.save();
  //   //   return basket2Add;
  //   // }
  // }

  async createBasket(createBasketDto: CreateBasketDto): Promise<Basket> {
    return this.basketRepository.createBasket(createBasketDto);
  }
  async deleteBasket(id: string): Promise<void> {
    const result = await this.basketRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Basket with ID:${id} not found`);
    }
  }
  async updateBasket(
    id: string,
    createBasketDto: CreateBasketDto,
  ): Promise<Basket> {
    const basket = await this.getBasketById(id);
    const updated = Object.assign(basket, createBasketDto);
    await updated.save();
    return updated;
  }
  async syncBasket(jobsDto: JobsDto): Promise<Basket> {
    const { tempBasketId, userBasketId } = jobsDto;
    const tempBasket = await this.getBasketById(tempBasketId);
    const userBasket = await this.getBasketById(userBasketId);
    const basketItems = tempBasket.items;

    basketItems.forEach(async (item) => {
      const basketItem = await getRepository(BasketItem).findOne({
        where: { id: item.id },
      });

      let updated;
      if (userBasket.items.some((x) => x.product.id === item.product.id)) {
        const foundArr = userBasket.items.filter(
          (x) => x.product.id === item.product.id,
        );

        const foundItem = await getRepository(BasketItem).findOne({
          where: { id: foundArr[0].id },
        });

        updated = Object.assign(basketItem, {
          basket: userBasketId,
          qty: foundItem.qty + item.qty,
        });
        await getRepository(BasketItem).delete({ id: foundItem.id });
      } else {
        updated = Object.assign(basketItem, { basket: userBasketId });
      }

      await getRepository(BasketItem).save(updated);
    });
    const newUserBasket = await this.getBasketById(userBasketId);
    return newUserBasket;
  }
}
