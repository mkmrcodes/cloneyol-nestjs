import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { CartItem } from './cart-item.entity';
import { CartItemRepository } from './cart-item.repository';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemRepository)
    private cartItemRepository: CartItemRepository,
  ) {}
  async getCartItemById(id: string): Promise<CartItem> {
    const found = await this.cartItemRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`CartItem with ID:${id} not found`);
    }
    return found;
  }
  async getCartItemsByCartId(cartId: string): Promise<CartItem[]> {
    const found = await this.cartItemRepository.getCartItemsByCartId(cartId);
    if (!found) {
      throw new NotFoundException(`CartItem with cartId:${cartId} not found`);
    }
    return found;
  }
  async createCartItem(
    createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    return this.cartItemRepository.createCartItem(createCartItemDto);
  }
  async deleteCartItem(id: string): Promise<void> {
    const result = await this.cartItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`CartItem with ID:${id} not found`);
    }
  }
  async updateCartItem(
    id: string,
    createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    const cartItem = await this.getCartItemById(id);
    const updated = Object.assign(cartItem, createCartItemDto);
    await updated.save();
    return updated;
  }
}
