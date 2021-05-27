import { User } from 'src/users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBillingDto } from './dto/create-billing.dto';
import { Billing } from './billing.entity';

@EntityRepository(User)
export class BillingRepository extends Repository<Billing> {
  async getBillingsByUserId(userId: string): Promise<Billing[]> {
    const billing = this.createQueryBuilder('billing')
      .where('shopping.user.userId = :userId', { userId: userId })
      .getMany();
    return billing;
  }
  async createBilling(createBillingDto: CreateBillingDto): Promise<Billing> {
    const billing = new Billing();
    const {
      isActive,
      contactName,
      city,
      country,
      address,
      zipCode,
      profile,
    } = createBillingDto;

    billing.isActive = isActive;
    billing.contactName = contactName;
    billing.city = city;
    billing.country = country;
    billing.address = address;
    billing.zipCode = zipCode;
    billing.profile = profile;

    await billing.save();
    return billing;
  }
}
