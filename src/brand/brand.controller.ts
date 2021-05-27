import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './brand.entity';
import { BrandService } from './brand.service';
import { GetBrandsFilterDto } from './dto/get-brands-filter.dto';

@Controller('brands')
export class BrandController {
  private logger = new Logger('BrandController');
  constructor(private brandsService: BrandService) {}

  @Get('')
  getBrands(
    @Query(ValidationPipe) getBrandsFilterDto: GetBrandsFilterDto,
  ): Promise<Brand[]> {
    this.logger.verbose(
      `Retrieving all brands. Filter: ${JSON.stringify(getBrandsFilterDto)}`,
    );
    return this.brandsService.getBrands(getBrandsFilterDto);
  }

  @Get('/:id')
  getBrandById(@Param('id') id: number): Promise<Brand> {
    this.logger.verbose(`Retrieving brand with id: ${id}`);
    return this.brandsService.getBrandById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBrand(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    this.logger.verbose(
      `Creating brand with name: ${createBrandDto.brandName}`,
    );
    return this.brandsService.createBrand(createBrandDto);
  }

  @Delete('/:id')
  deleteBrand(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.logger.verbose(`Deleting brand with id: ${id}`);
    return this.brandsService.deleteBrand(id);
  }

  @Patch('/:id')
  updateBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBrandDto: CreateBrandDto,
  ): Promise<Brand> {
    this.logger.verbose(`Updating brand with id: ${id}`);
    return this.brandsService.updateBrand(id, createBrandDto);
  }
}
