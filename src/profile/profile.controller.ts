import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { GetProfilesFilterDto } from './dto/get-profiles-filter.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  private logger = new Logger('ProfilesController');
  constructor(private profileService: ProfileService) {}

  @Get('/:id')
  getProfileById(@Param('id') id: string): Promise<Profile> {
    this.logger.verbose(`Retrieving profile with id: ${id}`);
    return this.profileService.getProfileById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProfile(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    this.logger.verbose(`Creating profile with name: ${createProfileDto.name}`);
    return this.profileService.createProfile(createProfileDto);
  }

  @Delete('/:id')
  deleteProfile(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Deleting profile with id: ${id}`);
    return this.profileService.deleteProfile(id);
  }

  @Patch('/:id/update')
  updateProfile(
    @Param('id') id: string,
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    this.logger.verbose(`Updating profile with id: ${id}`);
    return this.profileService.updateProfile(createProfileDto);
  }

  @Get('')
  getProfiles(
    @Query(ValidationPipe) getProfilesFilterDto: GetProfilesFilterDto,
  ): Promise<Profile[]> {
    this.logger.verbose(
      `Retrieving all items. Filter: ${JSON.stringify(getProfilesFilterDto)}`,
    );
    return this.profileService.getProfiles(getProfilesFilterDto);
  }
}
