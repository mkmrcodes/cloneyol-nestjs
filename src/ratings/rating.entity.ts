import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rating extends BaseEntity {
  //this is from itemId
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'real', default: 0 })
  ratingCount: string;

  @Column({ type: 'decimal', precision: 4, scale: 1, default: 0 })
  averageRating: number;
}
