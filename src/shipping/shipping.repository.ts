import { User } from 'src/users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { Shipping } from './shipping.entity';

@EntityRepository(User)
export class ShippingRepository extends Repository<Shipping> {
  async getShippingsByUserId(userId: string): Promise<Shipping[]> {
    const shipping = this.createQueryBuilder('shipping')
      .where('shopping.user.userId = :userId', { userId: userId })
      .getMany();
    return shipping;
  }
  async createShipping(
    createShippingDto: CreateShippingDto,
  ): Promise<Shipping> {
    const shipping = new Shipping();
    const {
      isActive,
      contactName,
      city,
      country,
      address,
      zipCode,
      profile,
    } = createShippingDto;

    shipping.isActive = isActive;
    shipping.contactName = contactName;
    shipping.city = city;
    shipping.country = country;
    shipping.address = address;
    shipping.zipCode = zipCode;
    shipping.profile = profile;

    await shipping.save();
    return shipping;
  }
}
