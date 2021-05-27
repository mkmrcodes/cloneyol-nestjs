import { IsNotEmpty } from 'class-validator';
import { Profile } from 'src/profile/profile.entity';

export class CreateBillingDto {
  @IsNotEmpty()
  isActive!: boolean;
  @IsNotEmpty()
  contactName!: string;
  @IsNotEmpty()
  city!: string;
  @IsNotEmpty()
  country!: string;
  @IsNotEmpty()
  address!: string;
  @IsNotEmpty()
  zipCode!: string;
  @IsNotEmpty()
  profile: Profile;
}
