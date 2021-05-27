import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  private logger = new Logger('CartController');
  constructor(private cartService: CartService) {}

  @Get('/:id')
  getCartById(@Param('id') id: string): Promise<Cart> {
    this.logger.verbose(`Retrieving cart with id: ${id}`);
    return this.cartService.getCartById(id);
  }
  getCartByUserId(@Param('userId') userId: string): Promise<Cart> {
    this.logger.verbose(`Retrieving cart with userId: ${userId}`);
    return this.cartService.getCartByUserId(userId);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createCart(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    this.logger.verbose(
      `Creating cart with profile id: ${createCartDto.profile.id}`,
    );
    return this.cartService.createCart(createCartDto);
  }

  @Delete('/:id')
  deleteCart(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Deleting cart with id: ${id}`);
    return this.cartService.deleteCart(id);
  }

  @Patch('/:id/update')
  updateCart(
    @Param('id') id: string,
    @Body() createCartDto: CreateCartDto,
  ): Promise<Cart> {
    this.logger.verbose(`Updating cart with id: ${id}`);
    return this.cartService.updateCart(id, createCartDto);
  }
}
