import { IsNotEmpty } from 'class-validator';
import { Item } from 'src/items/item.entity';
import { Profile } from 'src/profile/profile.entity';

export class CreateCommentDto {
  @IsNotEmpty()
  profile: Profile;
  @IsNotEmpty()
  item: Item;
  text: string;
  @IsNotEmpty()
  star: string;
}
