import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  catLabel: string;
  @IsNotEmpty()
  catSlug: string;
  parentCatId: number;
  attr1Label: string;
  attr1Id: string;
  attr2Label: string;
  attr2Id: string;
  attr3Label: string;
  attr3Id: string;
}
