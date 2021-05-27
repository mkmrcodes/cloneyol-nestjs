import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './brand.entity';
import { BrandRepository } from './brand.repository';
import { GetBrandsFilterDto } from './dto/get-brands-filter.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandRepository)
    private brandRepository: BrandRepository,
  ) {}

  async getBrands(getBrandsFilterDto: GetBrandsFilterDto): Promise<Brand[]> {
    return this.brandRepository.getBrands(getBrandsFilterDto);
  }

  async getBrandById(id: number): Promise<Brand> {
    const found = await this.brandRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Brand with ID:${id} not found`);
    }
    return found;
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandRepository.createBrand(createBrandDto);
  }
  async deleteBrand(id: number): Promise<void> {
    const result = await this.brandRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Brand with ID:${id} not found`);
    }
  }
  async updateBrand(
    id: number,
    createBrandDto: CreateBrandDto,
  ): Promise<Brand> {
    const brand = await this.getBrandById(id);
    const updated = Object.assign(brand, createBrandDto);
    await updated.save();
    return updated;
  }
}
