import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from 'src/items/item.repository';
import { BasketItemsController } from './basketitems.controller';
import { BasketItemsRepository } from './basketitems.repository';
import { BasketItemsService } from './basketitems.service';

@Module({
  imports: [TypeOrmModule.forFeature([BasketItemsRepository, ItemRepository])],
  controllers: [BasketItemsController],
  providers: [BasketItemsService],
})
export class BasketItemsModule {}
