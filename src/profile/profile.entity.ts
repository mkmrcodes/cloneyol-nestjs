import { Basket } from 'src/basket/basket.entity';
import { Billing } from 'src/billing/billing.entity';
import { Cart } from 'src/cart/cart.entity';
import { Comment } from 'src/comment/comment.entity';
import { Shipping } from 'src/shipping/shipping.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Profile extends BaseEntity {
  @PrimaryColumn({ type: 'character varying', length: 50 })
  id!: string;

  @Column({ type: 'character varying', length: 50, nullable: true })
  name!: string | null;

  @Column({ type: 'character varying', length: 50, nullable: true })
  surname!: string | null;

  @Column({ type: 'character varying', length: 50, unique: true })
  email!: string;

  @Column({ type: 'character varying', length: 20, nullable: true })
  gsmNumber!: string | null;

  @Column({ type: 'character varying', length: 20, nullable: true })
  birthDay!: string | null;

  @Column({ type: 'character varying', length: 20, nullable: true })
  gender: string | null;

  @Column({ type: 'character varying', length: 20, nullable: true })
  identityNumber!: string | null;

  @Column({ type: 'character varying', length: 250, nullable: true })
  registrationAddress!: string | null;

  @Column({ type: 'character varying', length: 20, nullable: true })
  ip!: string | null;

  @Column({ type: 'character varying', length: 50, nullable: true })
  city!: string | null;

  @Column({ type: 'character varying', length: 50, nullable: true })
  country!: string | null;

  @Column({ type: 'character varying', length: 20, nullable: true })
  zipCode!: string | null;

  @OneToOne(() => Basket, { eager: true })
  @JoinColumn()
  basket: Basket;

  @OneToMany(() => Cart, (cart: Cart) => cart.profile, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  carts: Cart[];

  @OneToMany(() => Shipping, (shipping) => shipping.profile, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  shippings: Shipping[];

  @OneToMany(() => Billing, (billing) => billing.profile, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  billings: Billing[];

  @OneToMany(() => Comment, (comment) => comment.profile, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comments: Comment[];

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
