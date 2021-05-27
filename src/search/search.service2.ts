import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/category.repository';
import { ItemRepository } from 'src/items/item.repository';
import { SearchFilterDto } from './dto/search-filter.dto';
import { uniqBy } from 'lodash';
import { BrandRepository } from 'src/brand/brand.repository';
import { getRepository, getTreeRepository } from 'typeorm';
import { Category } from 'src/category/category.entity';
@Injectable({ scope: Scope.REQUEST })
export class SearchService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    @InjectRepository(BrandRepository)
    private brandRepository: BrandRepository,
  ) {}

  async findAll(searchFilterDto: SearchFilterDto): Promise<any> {
    const url = this.request.url.replace('/api', '');

    const { wc, wb, fc, prc, pr } = searchFilterDto;

    let isCargoFiltered = false;
    let isPriceFiltered = 'false';
    let isRatingFiltered = 'false';

    let brandArr;
    if (wb) {
      brandArr = wb.split(',').map((x) => +x);
    }

    // category tree
    const parent = await this.categoryRepository.findOne(wc);
    const leafs = await getTreeRepository(Category).findDescendants(parent);
    const leafArr = leafs.map((leaf) => leaf.id);

    const ancestors = await this.categoryRepository.findAncestors(parent);

    const qb = this.itemRepository.createQueryBuilder('item');
    qb.leftJoin('item.category', 'category');
    qb.leftJoin('item.brand', 'brand');
    qb.leftJoin('item.rating', 'rating');
    qb.select([
      'brand.id',
      'brand.brandName',
      'brand.brandSlug',
      'count(item.id) itemcount',
    ]);
    //qb.addSelect('item.price');
    qb.groupBy('brand.id');
    qb.addGroupBy('brand.brandName');
    qb.addGroupBy('brand.brandSlug');

    qb.orderBy('itemcount', 'DESC');
    //qb.where('item.category.id IN (:...leafArr)', { leafArr: leafArr });

    if (wc) {
      const topWC = ['1', '2', '3'];
      if (topWC.includes(wc)) {
        qb.where('item.category.id IN (:...leafArr)', {
          leafArr: leafArr,
        });
      } else {
        qb.where('item.category.id = :wc', {
          wc: `${wc}`,
        });
      }
    }

    //isCargoFree filter
    if (fc === 'true') {
      // qb.andWhere('item.isCargoFree = :fc', { fc: `${fc}` });
      isCargoFiltered = true;
    }
    // brand filter
    // if (wb) {
    //   qb.andWhere('item.brand.id IN (:...brandArr)', {
    //     brandArr: brandArr,
    //   });
    // }
    // isPriceFiltered filter
    if (prc) {
      // const prcRange = prc.split('-');
      // const prcstart = prcRange[0];
      // const prcend = prcRange[1];
      // qb.andWhere('item.price between :begin and :end ', {
      //   begin: `${prcstart}`,
      //   end: `${prcend}`,
      // });
      isPriceFiltered = prc;
    }
    //isRatingFiltered filter
    // if (pr) {
    //   qb.andWhere('"rating"."averageRating" = 0');
    //   isRatingFiltered = pr;
    // }
    if (pr) {
      // const rating = parseFloat(pr);
      // qb.andWhere('"rating"."averageRating" between :begin and :end ', {
      //   begin: `${rating}`,
      //   end: `${rating + 0.99}`,
      // });
      // console.log(rating + 0.99);

      isRatingFiltered = pr;
    }

    //console.log(qb.getSql());

    const brands = await qb.getRawMany();
    //console.log('brands:', brands);

    let wbf = '';
    if (wb) {
      brands.forEach(function (brand) {
        if (brandArr.includes(brand.brand_id) && brandArr.length >= 2) {
          wbf = `wb=${wb
            .replace(`${brand.brand_id},`, '')
            .replace(`,${brand.brand_id}`, '')}`;
          brand.url = url.replace(/wb=\d+([,]+\d+)*/, wbf);
        } else if (brandArr.includes(brand.brand_id) && brandArr.length === 1) {
          brand.url = url.replace(/&wb=\d+([,]+\d+)*/, '');
        } else {
          wbf = `wb=${wb + ',' + brand.brand_id}`;
          brand.url = url.replace(/wb=\d+([,]+\d+)*/, wbf);
        }
      });
    } else {
      brands.forEach(function (brand) {
        wbf = `&wb=${brand.brand_id}`;
        brand.url = url + wbf;
      });
    }

    const total = await qb.getCount();
    let selectedBrands = null;
    if (wb) {
      selectedBrands = await this.brandRepository.getBrands({
        ids: wb,
        search: null,
      });
    }
    return {
      selectedFilters: {
        filters: parent,
        brands: selectedBrands,
        filterField: 'category',
        isCargoFiltered: isCargoFiltered,
        isPriceFiltered: isPriceFiltered,
        isRatingFiltered: isRatingFiltered,
        reqUrl: url,
      },
      categoryLeafs: leafs,
      brands: brands,
      ancestors: ancestors,
      total: total,
    };
  }
  //--------------------------------------------
  async getBrandsByCategory(id: number): Promise<any> {
    const qb = this.itemRepository.createQueryBuilder('item');
    qb.leftJoin('item.category', 'category');
    qb.leftJoin('item.brand', 'brand');
    qb.select(['brand.brandName', 'brand.id', 'brand.brandSlug']);
    qb.addSelect(['category.id', 'category.catLabel', 'category.catSlug']);
    qb.groupBy('brand.id');
    qb.addGroupBy('category.id');
    qb.addGroupBy('category.catLabel');
    qb.addGroupBy('category.catSlug');
    qb.where('item.category.id = :wc', { wc: id });

    //console.log(qb.getSql());

    const brands = await qb.getRawMany();
    const uniqueBrands = uniqBy(brands, 'brand_id');

    //cat is top level then search for descendant cat's brands :)
    if (brands.length === 0) {
      const parent = await this.categoryRepository.findOne(id);
      const leafs = await this.categoryRepository.findDescendants(parent);
      const leafArr = leafs.map((leaf) => leaf.id);
      const qc = this.itemRepository.createQueryBuilder('item');
      qc.leftJoin('item.category', 'category');
      qc.leftJoin('item.brand', 'brand');
      qc.select(['brand.brandName', 'brand.id', 'brand.brandSlug']);
      qc.addSelect(['category.id', 'category.catLabel', 'category.catSlug']);
      qc.groupBy('brand.id');
      qc.addGroupBy('category.id');
      qc.addGroupBy('category.catLabel');
      qc.addGroupBy('category.catSlug');

      qc.where('item.category.id IN (:...leafArr)', { leafArr: leafArr });
      const result = await qc.getRawMany();
      //console.log(result[0].category_id);
      //result[0].category_id = 1;
      for (let i = 0; i <= result.length - 1; i++) {
        result[i].category_id = parent.id;
        result[i].category_catLabel = parent.catLabel;
        result[i].category_catSlug = parent.catSlug;
      }

      const uniqueResult = uniqBy(result, 'brand_id');
      return {
        brands: uniqueResult,
      };
    }
    return {
      brands: uniqueBrands,
    };
  }
}
