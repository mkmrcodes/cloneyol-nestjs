import { BasketItem } from 'src/basketitems/basketitem.entity';
import { Profile } from 'src/profile/profile.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Basket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'character varying', length: 50, nullable: true })
  profileId: string;

  @OneToMany(() => BasketItem, (basketItem) => basketItem.basket)
  items: BasketItem[];

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
