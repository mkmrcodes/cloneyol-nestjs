import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBillingDto } from './dto/create-billing.dto';
import { Billing } from './billing.entity';
import { BillingRepository } from './billing.repository';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(BillingRepository)
    private billingRepository: BillingRepository,
  ) {}

  async getBillingById(id: string): Promise<Billing> {
    const found = await this.billingRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Shippping with id::${id} not found`);
    }
    return found;
  }
  async getBillingsByUserId(userId: string): Promise<Billing[]> {
    const found = await this.billingRepository.getBillingsByUserId(userId);
    if (!found) {
      throw new NotFoundException(`Billing with userId:${userId} not found`);
    }
    return found;
  }

  async createBilling(createBillingDto: CreateBillingDto): Promise<Billing> {
    return this.billingRepository.createBilling(createBillingDto);
  }
  async deleteBilling(id: string): Promise<void> {
    const result = await this.billingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Billing with id:${id} not found`);
    }
  }
  async updateBilling(
    id: string,
    createBillingDto: CreateBillingDto,
  ): Promise<Billing> {
    const billing = await this.getBillingById(id);
    const updated = Object.assign(billing, createBillingDto);
    await updated.save();
    return updated;
  }
}
