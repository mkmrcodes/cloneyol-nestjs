import { Cart } from 'src/cart/cart.entity';
import { Item } from 'src/items/item.entity';
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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @ManyToOne(() => Item)
  @JoinColumn()
  item: Item;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  totalPrice: number | null;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  stock: number;

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

  //auto calculates total of cartitem
  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  calculatePrice(): void {
    this.totalPrice = this.price * this.quantity;
  }
}
