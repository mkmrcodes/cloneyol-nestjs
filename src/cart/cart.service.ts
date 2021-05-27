import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './cart.entity';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartRepository)
    private cartRepository: CartRepository,
  ) {}
  async getCartById(id: string): Promise<Cart> {
    const found = await this.cartRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Cart with ID:${id} not found`);
    }
    return found;
  }
  async getCartByUserId(userId: string): Promise<Cart> {
    const found = await this.cartRepository.getCartByUserId(userId);
    if (!found) {
      throw new NotFoundException(`Cart with userId:${userId} not found`);
    }
    return found;
  }
  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartRepository.createCart(createCartDto);
  }
  async deleteCart(id: string): Promise<void> {
    const result = await this.cartRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cart with ID:${id} not found`);
    }
  }
  async updateCart(id: string, createCartDto: CreateCartDto): Promise<Cart> {
    const cart = await this.getCartById(id);
    const updated = Object.assign(cart, createCartDto);
    await updated.save();
    return updated;
  }
}
