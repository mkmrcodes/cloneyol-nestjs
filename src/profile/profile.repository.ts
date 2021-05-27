import { Basket } from 'src/basket/basket.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { GetProfilesFilterDto } from './dto/get-profiles-filter.dto';
import { Profile } from './profile.entity';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  // async getProfileByUserId(id: string): Promise<Profile> {
  //   const profile = this.createQueryBuilder('profile')
  //     .where('profile.user.userId = :userId', { userId: id })
  //     .getOne();
  //   return profile;
  // }
  async getProfiles(
    getProfilesFilterDto: GetProfilesFilterDto,
  ): Promise<Profile[]> {
    const { search } = getProfilesFilterDto;
    const query = this.createQueryBuilder('profile');

    if (search) {
      query.andWhere('profile.email LIKE :search', {
        search: `%${search}%`,
      });
    }

    const profiles = await query.getMany();
    return profiles;
  }
  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = new Profile();
    const {
      id,
      name,
      surname,
      email,
      gsmNumber,
      birthDay,
      gender,
      identityNumber,
      registrationAddress,
      ip,
      city,
      country,
      zipCode,
    } = createProfileDto;
    const basket = await getRepository(Basket).insert({
      profileId: id,
      items: [],
    });
    console.log(basket);

    profile.id = id;
    profile.name = name;
    profile.surname = surname;
    profile.email = email;
    profile.gsmNumber = gsmNumber;
    profile.birthDay = birthDay;
    profile.gender = gender;
    profile.identityNumber = identityNumber;
    profile.registrationAddress = registrationAddress;
    profile.ip = ip;
    profile.city = city;
    profile.country = country;
    profile.zipCode = zipCode;
    profile.basket = basket.raw[0];
    await profile.save();
    return profile;
  }
}
