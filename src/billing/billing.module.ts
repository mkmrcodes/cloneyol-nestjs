import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingController } from './billing.controller';
import { BillingRepository } from './billing.repository';
import { BillingService } from './billing.service';

@Module({
  imports: [TypeOrmModule.forFeature([BillingRepository])],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
