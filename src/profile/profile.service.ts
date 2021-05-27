import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { GetProfilesFilterDto } from './dto/get-profiles-filter.dto';
import { Profile } from './profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}
  async getProfiles(
    getItemsFilterDto: GetProfilesFilterDto,
  ): Promise<Profile[]> {
    return this.profileRepository.getProfiles(getItemsFilterDto);
  }
  async getProfileById(id: string): Promise<Profile> {
    const found = await this.profileRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Profile with ID:${id} not found`);
    }
    return found;
  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileRepository.createProfile(createProfileDto);
  }
  async deleteProfile(id: string): Promise<void> {
    const result = await this.profileRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Profile with ID:${id} not found`);
    }
  }
  async updateProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = await this.getProfileById(createProfileDto.id);
    const updated = Object.assign(profile, createProfileDto);
    await updated.save();
    return updated;
  }
}
