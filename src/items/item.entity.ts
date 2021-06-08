import { Brand } from 'src/brand/brand.entity';
import { Category } from 'src/category/category.entity';
import { Merchant } from 'src/merchant/merchant.entity';
import { Promotion } from 'src/promotion/promotion.entity';
import { Rating } from 'src/ratings/rating.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export const ALLOWED_ITEMTYPES = {
  PHYSICAL: 'PHYSICAL',
  VIRTUAL: 'VIRTUAL',
};

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'character varying',
    length: 20,
    unique: true,
  })
  code!: string;

  @Column({ type: 'character varying', length: 250 })
  name!: string;

  @Column({ type: 'character varying', length: 250 })
  slug!: string;

  @Column({ type: 'int', default: 1 })
  qty: number;

  @ManyToOne(() => Brand, { eager: true })
  brand: Brand;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  oldPrice: number | null;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'int', nullable: true })
  discountRatio: number | null;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  discountPrice: number | null;

  @Column({ type: 'boolean', default: false })
  isCargoFree!: boolean;

  @Column({ type: 'character varying', length: 250, nullable: true })
  image!: string | null;

  @Column({ type: 'character varying', length: 250, nullable: true })
  zoomImg!: string | null;

  @ManyToOne(() => Category, { eager: true })
  category: Category;

  @ManyToOne(() => Promotion, { eager: true })
  promotion: Promotion;

  @Column({ type: 'int', nullable: true })
  basketLimit!: number;

  @Column({ type: 'int', nullable: true })
  stock!: number;

  @ManyToOne(() => Merchant, { eager: true })
  merchant: Merchant;

  @OneToOne(() => Rating, { eager: true })
  @JoinColumn()
  rating: Rating;

  @Column({
    type: 'enum',
    enum: Object.values(ALLOWED_ITEMTYPES),
    default: ALLOWED_ITEMTYPES.PHYSICAL,
  })
  itemType!: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
    onUpdate: 'CURRENT_TIMESTAMP(0)',
  })
  updatedAt!: Date;

  @VersionColumn()
  @Column({ default: 1 })
  version!: number;
}
