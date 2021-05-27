import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMerchantDto {
  @IsOptional()
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  name!: string;
}
