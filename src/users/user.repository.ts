import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
    const { search } = getUsersFilterDto;
    const query = this.createQueryBuilder('user');

    if (search) {
      query.andWhere('user.email LIKE :search', {
        search: `%${search}%`,
      });
    }

    const users = await query.getMany();
    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = this.createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOne();
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const { email, password, isAdmin, isMerchant } = createUserDto;
    user.email = email;
    user.password = password;
    user.isAdmin = isAdmin;
    user.isMerchant = isMerchant;
    await user.save();
    return user;
  }
}
