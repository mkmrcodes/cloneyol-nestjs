// import {
//   EntitySubscriberInterface,
//   EventSubscriber,
//   getRepository,
//   InsertEvent,
// } from 'typeorm';
// import { Comment } from './comment.entity';

// @EventSubscriber()
// export class CommentSubscriber implements EntitySubscriberInterface<Comment> {
//   listenTo() {
//     return Comment;
//   }

//   async afterInsert(event: InsertEvent<Comment>) {
//     console.log(`AFTER ENTITY INSERTED: `, event.entity);
//     console.log(event.entity.item);

//     const countReviews = await getRepository(Comment).count({
//       item: event.entity.item,
//     });
//     console.log('Update rating triggered comment count: ', countReviews);
//   }
// }
