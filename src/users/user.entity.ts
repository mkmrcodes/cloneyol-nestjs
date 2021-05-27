import { Expose } from 'class-transformer';
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
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  userId: string;

  @Column({ type: 'character varying', length: 50, unique: true })
  @Expose()
  email!: string;

  @Column({ type: 'character varying', length: 250 })
  password!: string;

  @Column({ type: 'boolean', default: false })
  @Expose()
  isAdmin!: boolean;

  @Column({ type: 'boolean', default: false })
  @Expose()
  isMerchant!: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  registrationDate!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
    onUpdate: 'CURRENT_TIMESTAMP(0)',
  })
  updatedAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(0)' })
  lastLoginDate!: Date;

  @VersionColumn()
  @Column({ default: 1 })
  version!: number;
}
