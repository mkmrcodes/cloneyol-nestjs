import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@SerializeOptions({ strategy: 'excludeAll' })
export class UsersController {
  private logger = new Logger('UsersController');
  constructor(private usersService: UsersService) {}

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  getUserById(@Param('id') id: string): Promise<User> {
    this.logger.verbose(`Retrieving user with userId: ${id}`);
    return this.usersService.getUserById(id);
  }

  @Get('/check/:email')
  getUserByEmail(@Param('email') email: string): Promise<User> {
    this.logger.verbose(`Retrieving user with email: ${email}`);
    return this.usersService.getUserByEmail(email);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.verbose(`Creating user with email: ${createUserDto.email}`);
    return this.usersService.createUser(createUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): Promise<string> {
    this.logger.verbose(`Deleting user with userId: ${id}`);
    return this.usersService.deleteUser(id);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    this.logger.verbose(`Updating user with userId: ${id}`);
    return this.usersService.updateUser(id, createUserDto);
  }

  @Get('')
  getUsers(
    @Query(ValidationPipe) getUsersFilterDto: GetUsersFilterDto,
  ): Promise<User[]> {
    this.logger.verbose(
      `Retrieving all items. Filter: ${JSON.stringify(getUsersFilterDto)}`,
    );
    return this.usersService.getUsers(getUsersFilterDto);
  }
}
