import { EntityRepository, Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './brand.entity';
import { GetBrandsFilterDto } from './dto/get-brands-filter.dto';

@EntityRepository(Brand)
export class BrandRepository extends Repository<Brand> {
  async getBrands(getBrandsFilterDto: GetBrandsFilterDto): Promise<Brand[]> {
    const { search, ids } = getBrandsFilterDto;
    const query = this.createQueryBuilder('brand');

    if (search) {
      query.andWhere('brand.brandName LIKE :search', {
        search: `%${search}%`,
      });
    }
    if (ids) {
      const idsArr = ids.split(',').map((x) => +x);
      //console.log(idsArr);

      query.andWhere('brand.id IN (:...idsArr)', {
        idsArr: idsArr,
      });
    }

    const brands = await query.getMany();
    return brands;
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = new Brand();
    const { brandName, brandSlug } = createBrandDto;
    brand.brandName = brandName;
    brand.brandSlug = brandSlug;

    await brand.save();
    return brand;
  }
}
