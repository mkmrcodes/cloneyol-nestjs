import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Promotion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying', length: 50 })
  promotionLabel!: string;

  @Column({ type: 'int' })
  promotionDiscount!: number;

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
