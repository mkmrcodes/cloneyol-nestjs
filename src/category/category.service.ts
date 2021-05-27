import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { GetCategoriesFilterDto } from './dto/get-categories-filter.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async getCategories(
    getCategoriesFilterDto: GetCategoriesFilterDto,
  ): Promise<Category[]> {
    return this.categoryRepository.getCategories(getCategoriesFilterDto);
  }

  async getCategoryById(id: number): Promise<Category> {
    const found = await this.categoryRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Category with ID:${id} not found`);
    }
    return found;
  }

  async getChilds(id: number): Promise<Category[]> {
    const parent = await this.categoryRepository.findOne(id);
    const found = await this.categoryRepository.findDescendants(parent);
    if (!found) {
      throw new NotFoundException(`Category with ID:${id} not found`);
    }
    return found;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryRepository.createCategory(createCategoryDto);
  }
  async deleteCategory(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID:${id} not found`);
    }
  }
  async updateCategory(
    id: number,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.getCategoryById(id);
    const updated = Object.assign(category, createCategoryDto);
    await updated.save();
    return updated;
  }
}
