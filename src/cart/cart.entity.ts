import { CartItem } from 'src/cart-item/cart-item.entity';
import { Profile } from 'src/profile/profile.entity';
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export const ALLOWED_CURRENCY = {
  TL: 'TL',
  USD: 'USD',
  EUR: 'EUR',
  IRR: 'IRR',
};
export const ALLOWED_INSTALLMENT = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  SIX: 6,
  NINE: 9,
};

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  isPurchased: boolean;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  price!: number | null;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  paidPrice!: number | null;

  @ManyToOne(() => Profile, (profile) => profile.carts)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  items: CartItem[];

  @Column({
    type: 'enum',
    enum: Object.values(ALLOWED_CURRENCY),
    default: ALLOWED_CURRENCY.TL,
  })
  currency: string;

  @Column({
    type: 'enum',
    enum: Object.values(ALLOWED_INSTALLMENT),
    default: ALLOWED_INSTALLMENT.ONE,
  })
  installment: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
    onUpdate: 'CURRENT_TIMESTAMP(0)',
  })
  updatedAt: Date;

  @VersionColumn()
  @Column({ default: 1 })
  version: number;

  //auto calculates total of cart
  // @AfterLoad()
  // @AfterInsert()
  // @AfterUpdate()
  // calculatePrice(): void {
  //   this.price = this.items
  //     .map((item) => Number(item.totalPrice))
  //     .reduce((sum, val) => {
  //       return sum + val;
  //     }, 0);
  // }
}
