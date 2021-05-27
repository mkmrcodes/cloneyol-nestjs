import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingController } from './shipping.controller';
import { ShippingRepository } from './shipping.repository';
import { ShippingService } from './shipping.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingRepository])],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
