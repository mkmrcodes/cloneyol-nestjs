import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { GetMerchantsFilterDto } from './dto/get-merchants-filter.dto';
import { Merchant } from './merchant.entity';
import { MerchantRepository } from './merchant.repository';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(MerchantRepository)
    private merchantRepository: MerchantRepository,
  ) {}

  async getMerchants(
    getMerchantsFilterDto: GetMerchantsFilterDto,
  ): Promise<Merchant[]> {
    return this.merchantRepository.getMerchants(getMerchantsFilterDto);
  }

  async getMerchantById(id: number): Promise<Merchant> {
    const found = await this.merchantRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Merchant with ID:${id} not found`);
    }
    return found;
  }

  async createMerchant(
    createMerchantDto: CreateMerchantDto,
  ): Promise<Merchant> {
    return this.merchantRepository.createMerchant(createMerchantDto);
  }
  async deleteMerchant(id: number): Promise<void> {
    const result = await this.merchantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Merchant with ID:${id} not found`);
    }
  }
  async updateMerchant(
    id: number,
    createMerchantDto: CreateMerchantDto,
  ): Promise<Merchant> {
    const merchant = await this.getMerchantById(id);
    const updated = Object.assign(merchant, createMerchantDto);
    await updated.save();
    return updated;
  }
}
