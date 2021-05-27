import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketController } from './basket.controller';
import { BasketRepository } from './basket.repository';
import { BasketService } from './basket.service';

@Module({
  imports: [TypeOrmModule.forFeature([BasketRepository])],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
