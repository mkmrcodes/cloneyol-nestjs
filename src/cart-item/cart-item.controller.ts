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
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { CartItem } from './cart-item.entity';
import { CartItemService } from './cart-item.service';

@Controller('cart-item')
export class CartItemController {
  private logger = new Logger('CartItemController');
  constructor(private cartItemService: CartItemService) {}

  @Get('/:id')
  getCartItemById(@Param('id') id: string): Promise<CartItem> {
    this.logger.verbose(`Retrieving cartItem with id: ${id}`);
    return this.cartItemService.getCartItemById(id);
  }
  getCartItemsByCartId(@Param('cartId') cartId: string): Promise<CartItem[]> {
    this.logger.verbose(`Retrieving cartItem with cartId: ${cartId}`);
    return this.cartItemService.getCartItemsByCartId(cartId);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createCartItem(
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    this.logger.verbose(
      `Creating cartItem with cart id: ${createCartItemDto.cart.id}`,
    );
    return this.cartItemService.createCartItem(createCartItemDto);
  }

  @Delete('/:id')
  deleteCartItem(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Deleting cartItem with id: ${id}`);
    return this.cartItemService.deleteCartItem(id);
  }

  @Patch('/:id')
  updateCartItem(
    @Param('id') id: string,
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    this.logger.verbose(`Updating cartItem with id: ${id}`);
    return this.cartItemService.updateCartItem(id, createCartItemDto);
  }
}
