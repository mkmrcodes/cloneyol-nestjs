import { EntityRepository, Repository } from 'typeorm';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { GetMerchantsFilterDto } from './dto/get-merchants-filter.dto';
import { Merchant } from './merchant.entity';

@EntityRepository(Merchant)
export class MerchantRepository extends Repository<Merchant> {
  async getMerchants(
    getMerchantsFilterDto: GetMerchantsFilterDto,
  ): Promise<Merchant[]> {
    const { search } = getMerchantsFilterDto;
    const query = this.createQueryBuilder('merchant');

    if (search) {
      query.andWhere('merchant.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    const items = await query.getMany();
    return items;
  }

  async createMerchant(
    createMerchantDto: CreateMerchantDto,
  ): Promise<Merchant> {
    const merchant = new Merchant();
    const { name } = createMerchantDto;
    merchant.name = name;

    await merchant.save();
    return merchant;
  }
}
