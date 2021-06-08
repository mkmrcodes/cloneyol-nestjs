import slugify from 'slugify';
import { Brand } from 'src/brand/brand.entity';
import { Category } from 'src/category/category.entity';
import { Rating } from 'src/ratings/rating.entity';
import {
  EntityRepository,
  getRepository,
  getTreeRepository,
  Repository,
} from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { Item } from './item.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async getItems(getItemsFilterDto: GetItemsFilterDto): Promise<Item[]> {
    const { search, wc, wb, fc, prc, pr, sst, q } = getItemsFilterDto;
    let brandsArr;
    if (wb) {
      brandsArr = wb.split(',').map((x) => +x);
    }
    const query = this.createQueryBuilder('items')
      .leftJoinAndSelect('items.brand', 'brand')
      .leftJoinAndSelect('items.category', 'category')
      .leftJoinAndSelect('items.promotion', 'promotion')
      .leftJoinAndSelect('items.merchant', 'merchant')
      .leftJoinAndSelect('items.rating', 'rating');

    if (search) {
      query.where('items.code LIKE :search', {
        search: `%${search}%`,
      });
    }
    if (wc) {
      const topWC = ['1', '2', '3'];
      if (topWC.includes(wc.toString())) {
        const parent = await getRepository(Category).findOne(wc);
        const leafs = await getTreeRepository(Category).findDescendants(parent);
        const leafArr = leafs.map((leaf) => leaf.id);

        query.where('items.category.id IN (:...leafArr)', {
          leafArr: leafArr,
        });
      } else {
        query.where('items.category.id = :wc', {
          wc: `${wc}`,
        });
      }
    }
    if (wb) {
      query.andWhere('items.brand.id IN (:...brandsArr)', {
        brandsArr: brandsArr,
      });
    }
    if (pr) {
      query.andWhere('"rating"."averageRating" >= :pr', {
        pr: parseInt(pr),
      });
    }
    if (fc) {
      query.andWhere('items.isCargoFree = :fc', {
        fc: fc,
      });
    }

    let prcstart;
    let prcend;
    if (prc) {
      const prcRange = prc.split('-');
      prcstart = prcRange[0];
      prcend = prcRange[1];
      query.andWhere(`items.price between ${prcstart} and ${prcend}`);
    }
    if (sst) {
      if (sst === 'PRICE_BY_ASC') {
        query.orderBy('items.price', 'ASC');
      } else if (sst === 'PRICE_BY_DESC') {
        query.orderBy('items.price', 'DESC');
      } else if (sst === 'MOST_RATED') {
        query.orderBy('"rating"."ratingCount"', 'DESC');
      } else if (sst === 'MOST_RECENT') {
        query.orderBy('items.updatedAt', 'DESC');
      }
    }

    if (q) {
      const sq = this.createQueryBuilder('items');
      sq.select('items.name');
      sq.addSelect('items.id');
      sq.addSelect('items.slug');
      sq.where(
        `to_tsvector('pg_catalog.turkish',items.name) @@ to_tsquery('pg_catalog.turkish', :query)`,
        { query: `${q.replace(' ', '+')}:*` },
      );
      const sResults = await sq.getMany();
      return sResults;
    }
    //console.log(query.getSql());
    const items = await query.getMany();

    //upper level category searchs
    // if (items.length === 0) {
    //   const parent = await getRepository(Category).findOne(wc);
    //   const leafs = await getTreeRepository(Category).findDescendants(parent);
    //   const leafArr = leafs.map((leaf) => leaf.id);

    //   query.andWhere('items.category.id IN (:...leafArr)', {
    //     leafArr: leafArr,
    //   });

    //   const xitems = await query.getMany();

    //   return xitems;
    // }
    // if (!wb && items.length === 0) {
    //   const parent = await getRepository(Category).findOne(wc);
    //   const leafs = await getTreeRepository(Category).findDescendants(parent);
    //   const leafArr = leafs.map((leaf) => leaf.id);

    //   query.andWhere('items.category.id IN (:...leafArr)', {
    //     leafArr: leafArr,
    //   });

    //   const yitems = await query.getMany();

    //   return yitems;
    // }
    return items;
  }

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const newRating = getRepository(Rating).create();
    newRating.ratingCount = '0';
    newRating.averageRating = 0;
    const rating = await getRepository(Rating).save(newRating);
    const item = new Item();
    const {
      code,
      name,
      brand,
      price,
      isCargoFree,
      image,
      zoomImg,
      category,
      promotion,
      basketLimit,
      stock,
      merchant,
    } = createItemDto;
    let { oldPrice, discountRatio, discountPrice } = createItemDto;
    console.log(createItemDto);

    if (oldPrice == 0) {
      oldPrice = null;
    }
    if (discountRatio == 0) {
      discountRatio = null;
    }
    if (discountPrice == 0) {
      discountPrice = null;
    }
    const slug1 = name.toLowerCase();
    const slug = slugify(slug1);
    item.code = code;
    item.name = name;
    item.slug = slug;
    item.brand = brand;
    item.oldPrice = oldPrice;
    item.price = price;
    item.discountRatio = discountRatio;
    item.discountPrice = discountPrice;
    item.isCargoFree = isCargoFree;
    item.image = image;
    item.zoomImg = zoomImg;
    item.category = category;
    item.promotion = promotion;
    item.basketLimit = basketLimit;
    item.stock = stock;
    item.merchant = merchant;
    item.rating = rating;

    await item.save();
    return item;
  }
}
