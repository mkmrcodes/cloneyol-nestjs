import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandRepository } from 'src/brand/brand.repository';
import { CategoryRepository } from 'src/category/category.repository';
import { ItemRepository } from 'src/items/item.repository';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemRepository,
      CategoryRepository,
      BrandRepository,
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
