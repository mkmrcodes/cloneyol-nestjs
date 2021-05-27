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
import { CreateBasketDto } from './dto/create-basket.dto';
import { Basket } from './basket.entity';
import { BasketService } from './basket.service';
import { JobsDto } from './dto/jobs-basket.dto';

@Controller('basket')
export class BasketController {
  private logger = new Logger('BasketController');
  constructor(private basketService: BasketService) {}

  // @Get('/add')
  // addItem(@Query(ValidationPipe) jobsDto: JobsDto): Promise<Basket> {
  //   this.logger.verbose(`adding item to basket itemId: ${jobsDto.itemId}`);
  //   const basket = this.basketService.addItem(jobsDto);
  //   return basket;
  // }

  @Get('/profile/:id')
  getBasketByProfileId(@Param('id') id: string): Promise<Basket> {
    this.logger.verbose(`Retrieving basket with profile id: ${id}`);
    return this.basketService.getBasketByProfileId(id);
  }
  @Get('/sync/')
  syncBasket(@Query(ValidationPipe) jobsDto: JobsDto): Promise<Basket> {
    this.logger.verbose(`updating users basket with anon users basket`);
    return this.basketService.syncBasket(jobsDto);
  }
  @Get('/:id')
  getBasketById(@Param('id') id: string): Promise<Basket> {
    this.logger.verbose(`Retrieving basket with id: ${id}`);
    return this.basketService.getBasketById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createBasket(@Body() createBasketDto: CreateBasketDto): Promise<Basket> {
    this.logger.verbose(`Creating basket`);
    return this.basketService.createBasket(createBasketDto);
  }

  @Delete('/:id')
  deleteBasket(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Deleting basket with id: ${id}`);
    return this.basketService.deleteBasket(id);
  }

  @Patch('/:id')
  updateBasket(
    @Param('id') id: string,
    @Body() createBasketDto: CreateBasketDto,
  ): Promise<Basket> {
    this.logger.verbose(`Updating basket with id: ${id}`);
    return this.basketService.updateBasket(id, createBasketDto);
  }
}
