import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsFilterDto } from './dto/get-comments-filter.dto';
import { Comment } from './comment.entity';
import { Rating } from 'src/ratings/rating.entity';
import { Item } from 'src/items/item.entity';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  async getComments(
    getCommentsFilterDto: GetCommentsFilterDto,
  ): Promise<Comment[]> {
    const { search } = getCommentsFilterDto;
    const query = this.createQueryBuilder('comment');

    if (search) {
      query.andWhere('comment.star LIKE :search', {
        search: `%${search}%`,
      });
    }

    const comments = await query.getMany();
    return comments;
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = new Comment();
    const { profile, item, text, star } = createCommentDto;
    comment.profile = profile;
    comment.item = item;
    comment.text = text;
    comment.star = star;
    await comment.save();

    const item2getRatingId = await getRepository(Item).findOne(item.id, {
      relations: ['rating'],
    });
    const rating2Update = await getRepository(Rating).findOne(
      item2getRatingId.rating.id,
    );
    const ratingCount = rating2Update.ratingCount + 1;
    const averageRating =
      (rating2Update.averageRating * parseInt(rating2Update.ratingCount) +
        parseInt(comment.star)) /
      parseInt(ratingCount);
    rating2Update.ratingCount = ratingCount;
    rating2Update.averageRating = averageRating;
    const updatedRating = await getRepository(Rating).save(rating2Update);
    console.log('Updated Rating: ', updatedRating);

    return comment;
  }
}
