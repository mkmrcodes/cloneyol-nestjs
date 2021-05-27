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
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { GetCategoriesFilterDto } from './dto/get-categories-filter.dto';

@Controller('category')
export class CategoryController {
  private logger = new Logger('CategoryController');
  constructor(private categoryService: CategoryService) {}

  @Get('')
  getCategories(
    @Query(ValidationPipe) getCategoriesFilterDto: GetCategoriesFilterDto,
  ): Promise<Category[]> {
    this.logger.verbose(
      `Retrieving all cats. Filter: ${JSON.stringify(getCategoriesFilterDto)}`,
    );
    return this.categoryService.getCategories(getCategoriesFilterDto);
  }

  @Get('/:id')
  getCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    this.logger.verbose(`Retrieving category with id: ${id}`);
    return this.categoryService.getCategoryById(id);
  }

  @Get('/tree/:id')
  getChilds(@Param('id', ParseIntPipe) id: number): Promise<Category[]> {
    this.logger.verbose(`Retrieving childs of category with id: ${id}`);
    return this.categoryService.getChilds(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    this.logger.verbose(
      `Creating category with label: ${createCategoryDto.catLabel}`,
    );
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: number): Promise<void> {
    this.logger.verbose(`Deleting category with id: ${id}`);
    return this.categoryService.deleteCategory(id);
  }

  @Patch('/:id')
  updateCategory(
    @Param('id') id: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    this.logger.verbose(`Updating category with id: ${id}`);
    return this.categoryService.updateCategory(id, createCategoryDto);
  }
}
