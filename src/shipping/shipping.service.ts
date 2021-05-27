import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { Shipping } from './shipping.entity';
import { ShippingRepository } from './shipping.repository';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(ShippingRepository)
    private shippingRepository: ShippingRepository,
  ) {}

  async getShippingById(id: string): Promise<Shipping> {
    const found = await this.shippingRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Shippping with id::${id} not found`);
    }
    return found;
  }
  async getShippingsByUserId(userId: string): Promise<Shipping[]> {
    const found = await this.shippingRepository.getShippingsByUserId(userId);
    if (!found) {
      throw new NotFoundException(`Shipping with userId:${userId} not found`);
    }
    return found;
  }

  async createShipping(
    createShippingDto: CreateShippingDto,
  ): Promise<Shipping> {
    return this.shippingRepository.createShipping(createShippingDto);
  }
  async deleteShipping(id: string): Promise<void> {
    const result = await this.shippingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Shipping with id:${id} not found`);
    }
  }
  async updateShipping(
    id: string,
    createShippingDto: CreateShippingDto,
  ): Promise<Shipping> {
    const shipping = await this.getShippingById(id);
    const updated = Object.assign(shipping, createShippingDto);
    await updated.save();
    return updated;
  }
}
