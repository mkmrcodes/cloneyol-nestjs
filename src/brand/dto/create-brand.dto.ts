import { IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  brandName!: string;
  @IsNotEmpty()
  brandSlug!: string;
}
