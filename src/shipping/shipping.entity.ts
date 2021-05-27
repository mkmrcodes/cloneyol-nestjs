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
import { Profile } from 'src/profile/profile.entity';

@Entity()
export class Shipping extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'boolean', default: false })
  isActive!: boolean;

  @Column({ type: 'character varying', length: 50, nullable: true })
  contactName!: string | null;

  @Column({ type: 'character varying', length: 50, nullable: true })
  city!: string | null;

  @Column({ type: 'character varying', length: 50, nullable: true })
  country!: string | null;

  @Column({ type: 'character varying', length: 250, nullable: true })
  address!: string | null;

  @Column({ type: 'character varying', length: 20, nullable: true })
  zipCode!: string | null;

  @ManyToOne(() => Profile, (profile) => profile.shippings)
  @JoinColumn()
  profile: Profile;

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
