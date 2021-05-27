import { Basket } from 'src/basket/basket.entity';
import { Item } from 'src/items/item.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class BasketItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn()
  product: Item;

  @Column({ type: 'int', default: 1 })
  qty: number;

  @ManyToOne(() => Basket, (basket) => basket.items, {
    eager: true,
  })
  @JoinColumn()
  basket: Basket;

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
