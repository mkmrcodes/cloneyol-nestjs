import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBasketItemDto } from './dto/create-basketitem.dto';
import { BasketItem } from './basketitem.entity';
import { BasketItemsService } from './basketitems.service';
import { JobsDto } from './dto/jobs-basketitem.dto';

@Controller('basketitem')
export class BasketItemsController {
  private logger = new Logger('BasketItemsController');
  constructor(private basketItemsService: BasketItemsService) {}

  @Get('/update')
  updateItem(@Query(ValidationPipe) jobsDto: JobsDto): Promise<BasketItem> {
    this.logger.verbose(`updating item to basketitem id: ${jobsDto.id}`);
    const basketitem = this.basketItemsService.updateItem(jobsDto);
    return basketitem;
  }
  @Get('/decqty/')
  decrementQty(@Query(ValidationPipe) jobsDto: JobsDto): Promise<BasketItem> {
    this.logger.verbose(`decrementing item qty basketitem id: ${jobsDto.id}`);
    const basketitem = this.basketItemsService.decrementQty(jobsDto);
    return basketitem;
  }
  @Get('/incqty/')
  incrementQty(@Query(ValidationPipe) jobsDto: JobsDto): Promise<BasketItem> {
    this.logger.verbose(`incrementing item qty basketitem id: ${jobsDto.id}`);
    const basketitem = this.basketItemsService.incrementQty(jobsDto);
    return basketitem;
  }
  @Get('/remove/')
  removeBasketItem(@Query(ValidationPipe) jobsDto: JobsDto): Promise<void> {
    this.logger.verbose(`removing basket item`);
    return this.basketItemsService.removeBasketItem(jobsDto);
  }

  @Get('/item')
  getBasketItemByItemId(
    @Query(ValidationPipe) jobsDto: JobsDto,
  ): Promise<BasketItem> {
    this.logger.verbose(`Retrieving basketitem with itemId: ${jobsDto.item}`);
    return this.basketItemsService.getBasketItemByItemId(jobsDto);
  }
  @Get('/:id')
  getBasketItemById(@Param('id') id: string): Promise<BasketItem> {
    this.logger.verbose(`Retrieving basketitem with id: ${id}`);
    return this.basketItemsService.getBasketItemById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createBasketItem(
    @Body() createBasketItemDto: CreateBasketItemDto,
  ): Promise<BasketItem> {
    this.logger.verbose(`Creating basketitem`);
    return this.basketItemsService.createBasketItem(createBasketItemDto);
  }

  @Delete('/:id')
  deleteBasketItems(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Deleting basketitem with id: ${id}`);
    return this.basketItemsService.deleteBasketItem(id);
  }

  @Patch('/:id')
  updateBasketItems(
    @Param('id') id: string,
    @Body() createBasketItemsDto: CreateBasketItemDto,
  ): Promise<BasketItem> {
    this.logger.verbose(`Updating basketitem with id: ${id}`);
    return this.basketItemsService.updateBasketItem(id, createBasketItemsDto);
  }
}
