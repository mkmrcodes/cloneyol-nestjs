import { EntityRepository, TreeRepository, getTreeRepository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';
import { GetCategoriesFilterDto } from './dto/get-categories-filter.dto';

@EntityRepository(Category)
export class CategoryRepository extends TreeRepository<Category> {
  async getCategories(
    getCategoriesFilterDto: GetCategoriesFilterDto,
  ): Promise<Category[]> {
    const { search } = getCategoriesFilterDto;
    const query = this.createQueryBuilder('category');

    if (search) {
      query.andWhere('category.catLabel LIKE :search', {
        search: `%${search}%`,
      });
    }

    const categories = await query.getMany();
    //const categories = await getTreeRepository(Category).findTrees();
    return categories;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = new Category();
    const {
      catLabel,
      catSlug,
      parentCatId,
      attr1Label,
      attr1Id,
      attr2Label,
      attr2Id,
      attr3Label,
      attr3Id,
    } = createCategoryDto;
    category.catLabel = catLabel;
    category.catSlug = catSlug;
    category.attr1Label = attr1Label;
    category.attr1Id = attr1Id;
    category.attr2Label = attr2Label;
    category.attr2Id = attr2Id;
    category.attr3Label = attr3Label;
    category.attr3Id = attr3Id;
    const prnt = await getTreeRepository(Category).findOne(parentCatId);
    if (prnt) {
      category.parent = prnt;
    }
    await category.save();
    return category;
  }
}
