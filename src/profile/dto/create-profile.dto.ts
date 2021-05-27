import { IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  id: string;
  name!: string;
  surname!: string;
  email!: string;
  gsmNumber!: string;
  birthDay!: string;
  gender!: string;
  identityNumber!: string;
  registrationAddress!: string;
  ip!: string;
  city!: string;
  country!: string;
  zipCode!: string;
}
