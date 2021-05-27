import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemController } from './cart-item.controller';
import { CartItemService } from './cart-item.service';
import { CartItemRepository } from './cart-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CartItemRepository])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
