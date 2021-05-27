import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { Item } from './item.entity';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  private logger = new Logger('ItemsController');
  constructor(private itemsService: ItemsService) {}

  @Get('/:id')
  getItemById(@Param('id') id: string): Promise<Item> {
    this.logger.verbose(`Retrieving item with id: ${id}`);
    return this.itemsService.getItemById(id);
  }

  @Get('/cat/:id')
  getItemByCatId(@Param('id', ParseIntPipe) id: number): Promise<any> {
    this.logger.verbose(`Retrieving items with cat id: ${id}`);
    return this.itemsService.getItemByCatId(id);
  }
  @Get('/cat-arr/:arr')
  filterItemsByCatArrayId(@Param('arr') arr: string): Promise<any> {
    this.logger.verbose(`Retrieving items with cat id: ${arr}`);
    return this.itemsService.filterItemsByCatArrayId(arr);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    this.logger.verbose(`Creating item with name: ${createItemDto.name}`);
    return this.itemsService.createItem(createItemDto);
  }

  @Delete('/:id')
  deleteItem(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Deleting item with id: ${id}`);
    return this.itemsService.deleteItem(id);
  }

  @Patch('/:id')
  updateItem(
    @Param('id') id: string,
    @Body() createItemDto: CreateItemDto,
  ): Promise<Item> {
    this.logger.verbose(`Updating item with id: ${id}`);
    return this.itemsService.updateItem(id, createItemDto);
  }

  @Get('')
  getItems(
    @Query(ValidationPipe) getItemsFilterDto: GetItemsFilterDto,
  ): Promise<Item[]> {
    this.logger.verbose(
      `Retrieving all items. Filter: ${JSON.stringify(getItemsFilterDto)}`,
    );
    return this.itemsService.getItems(getItemsFilterDto);
  }
}
