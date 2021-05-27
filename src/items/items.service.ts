import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { Item } from './item.entity';
import { ItemRepository } from './item.repository';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { getTreeRepository, In } from 'typeorm';
import { Category } from 'src/category/category.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
  ) {}
  async paginate(options: IPaginationOptions): Promise<Pagination<Item>> {
    return paginate<Item>(this.itemRepository, options);
  }
  async getItemById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Item with ID:${id} not found`);
    }
    return found;
  }

  // gets children of given category id and returns all items :)
  async getItemByCatId(id: number): Promise<any> {
    const parent = await getTreeRepository(Category).findOne(id);
    const found = await getTreeRepository(Category).findDescendants(parent);
    const catChildren = found.reduce(function (newArr, child) {
      newArr.push(child.id);
      return newArr;
    }, []);

    const items = await this.itemRepository.find({
      relations: ['category'],
      where: { category: In(catChildren) },
    });

    if (!items) {
      throw new NotFoundException(`Item with ID:${id} not found`);
    }

    return items;
  }
  async filterItemsByCatArrayId(filters: string): Promise<any> {
    const arr = JSON.parse('[' + filters + ']');
    const filterArr = [];
    for (let i = 1; i <= arr.length; i++) {
      const parent = await getTreeRepository(Category).findOne(arr[i]);
      const found = await getTreeRepository(Category).findDescendants(parent);
      const catChildren = found.reduce(function (newArr, child) {
        newArr.push(child.id);
        return newArr;
      }, []);
      filterArr.push(...catChildren);
    }
    const filterSet = new Set(filterArr);
    const Finally = [...filterSet];

    const items = await this.itemRepository.find({
      relations: ['category'],
      where: { category: In(Finally) },
    });

    if (!items) {
      throw new NotFoundException(`Item with ID:${filterArr} not found`);
    }

    return items;
  }
  async getItems(getItemsFilterDto: GetItemsFilterDto): Promise<Item[]> {
    return this.itemRepository.getItems(getItemsFilterDto);
  }
  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemRepository.createItem(createItemDto);
  }
  async deleteItem(id: string): Promise<void> {
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID:${id} not found`);
    }
  }
  async updateItem(id: string, createItemDto: CreateItemDto): Promise<Item> {
    const item = await this.getItemById(id);
    const updated = Object.assign(item, createItemDto);
    await updated.save();
    return updated;
  }
}
