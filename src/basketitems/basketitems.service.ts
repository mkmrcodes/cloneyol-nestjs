import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBasketItemDto } from './dto/create-basketitem.dto';
import { BasketItem } from './basketitem.entity';
import { BasketItemsRepository } from './basketitems.repository';
import { JobsDto } from './dto/jobs-basketitem.dto';
import { ItemRepository } from 'src/items/item.repository';

@Injectable()
export class BasketItemsService {
  constructor(
    @InjectRepository(BasketItemsRepository)
    private basketItemsRepository: BasketItemsRepository,
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
  ) {}

  async getBasketItemById(id: string): Promise<BasketItem> {
    const found = await this.basketItemsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`basketItem with ID:${id} not found`);
    }
    return found;
  }
  async getBasketItemByItemId(jobsDto: JobsDto): Promise<BasketItem> {
    const found = await this.basketItemsRepository.findOne({
      where: { id: jobsDto.id, item: jobsDto.item },
    });
    if (!found) {
      throw new NotFoundException(
        `basketItem with itemId:${jobsDto.item} not found`,
      );
    }
    return found;
  }
  async decrementQty(jobsDto: JobsDto): Promise<BasketItem> {
    const query = this.basketItemsRepository.createQueryBuilder('basketitem');
    query.where('basketitem.basket.id = :basketid', {
      basketid: jobsDto.basket,
    });
    query.andWhere('basketitem.product.id = :itemid', {
      itemid: jobsDto.item,
    });
    const found = await query.getOne();

    if (!found) {
      throw new NotFoundException(
        `basketItem with itemId:${jobsDto.item} not found`,
      );
    }
    if (found.qty >= 2) {
      found.qty = found.qty - 1;
      found.save();
      return found;
    }
    return found;
  }
  async incrementQty(jobsDto: JobsDto): Promise<BasketItem> {
    const query = this.basketItemsRepository.createQueryBuilder('basketitem');
    query.where('basketitem.basket.id = :basketid', {
      basketid: jobsDto.basket,
    });
    query.andWhere('basketitem.product.id = :itemid', {
      itemid: jobsDto.item,
    });
    const found = await query.getOne();

    if (!found) {
      throw new NotFoundException(
        `basketItem with itemId:${jobsDto.item} not found`,
      );
    }
    if (found.qty <= 9) {
      found.qty = found.qty + 1;
      found.save();
      return found;
    }
    return found;
  }
  async removeBasketItem(jobsDto: JobsDto): Promise<void> {
    const query = this.basketItemsRepository.createQueryBuilder('basketitem');
    query.where('basketitem.basket.id = :basketid', {
      basketid: jobsDto.basket,
    });
    query.andWhere('basketitem.product.id = :itemid', {
      itemid: jobsDto.item,
    });
    const found = await query.getOne();

    if (!found) {
      throw new NotFoundException(
        `basketItem with itemId:${jobsDto.item} not found`,
      );
    }
    const result = await this.basketItemsRepository.delete(found.id);
    if (result.affected === 0) {
      throw new NotFoundException(`basketItem with ID:${found.id} not found`);
    }
  }

  async updateItem(jobsDto: JobsDto): Promise<BasketItem> {
    const basketitem2Update = await this.basketItemsRepository.findOne(
      jobsDto.id,
    );
    if (!basketitem2Update) {
      throw new NotFoundException(`basketItem with ID:${jobsDto.id} not found`);
    }
    basketitem2Update.qty = jobsDto.qty;
    await basketitem2Update.save();
    return basketitem2Update;
  }

  async createBasketItem(
    createBasketItemDto: CreateBasketItemDto,
  ): Promise<BasketItem> {
    const query = this.basketItemsRepository.createQueryBuilder('basketitem');
    query.where('basketitem.basket.id = :basketid', {
      basketid: createBasketItemDto.basket,
    });
    query.andWhere('basketitem.product.id = :itemid', {
      itemid: createBasketItemDto.product,
    });
    const found = await query.getOne();

    if (!found) {
      return this.basketItemsRepository.createBasketItem(createBasketItemDto);
    } else {
      found.qty = found.qty + 1;
      await found.save();
    }
  }
  async deleteBasketItem(id: string): Promise<void> {
    const result = await this.basketItemsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`basketItem with ID:${id} not found`);
    }
  }
  async updateBasketItem(
    id: string,
    createBasketItemDto: CreateBasketItemDto,
  ): Promise<BasketItem> {
    const basketItem = await this.getBasketItemById(id);
    const updated = Object.assign(basketItem, createBasketItemDto);
    await updated.save();
    return updated;
  }
}
