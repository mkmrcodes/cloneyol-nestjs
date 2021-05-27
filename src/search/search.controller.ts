import {
  Controller,
  Logger,
  Get,
  ValidationPipe,
  Query,
  UseInterceptors,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { SearchFilterDto } from './dto/search-filter.dto';
import { SearchService } from './search.service';
import { TransformInterceptor } from './transform.interceptor';

@Controller()
@UseInterceptors(TransformInterceptor)
export class SearchController {
  private logger = new Logger('SearchController');
  constructor(private searchService: SearchService) {}

  @Get('/sr')
  findAll(
    @Query(ValidationPipe) searchFilterDto: SearchFilterDto,
  ): Promise<any> {
    this.logger.verbose(`Searching with filter: ${searchFilterDto.wc}`);
    const brands = this.searchService.findAll(searchFilterDto);

    // let result: ResultType;
    // result.brands = brands;
    //return ( 'filteredCat:' searhFilterDto.wb)
    return brands;
  }
  @Get('/sr/:id')
  getBrandsByCategory(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
    this.logger.verbose(`Searching for brands by category id: ${id}`);
    const brands = this.searchService.getBrandsByCategory(id);

    // let result: ResultType;
    // result.brands = brands;
    //return ( 'filteredCat:' searhFilterDto.wb)
    return brands;
  }
}
