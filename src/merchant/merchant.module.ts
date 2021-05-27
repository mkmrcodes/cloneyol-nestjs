import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantController } from './merchant.controller';
import { MerchantRepository } from './merchant.repository';
import { MerchantService } from './merchant.service';

@Module({
  imports: [TypeOrmModule.forFeature([MerchantRepository])],
  controllers: [MerchantController],
  providers: [MerchantService],
})
export class MerchantModule {}
