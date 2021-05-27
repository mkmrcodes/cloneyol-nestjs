import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying', length: 100 })
  catLabel: string;

  @Column({ type: 'character varying', length: 100 })
  catSlug: string;

  @TreeParent()
  parent: Category;

  @TreeChildren()
  children: Category[];

  @Column({ type: 'character varying', length: 50, nullable: true })
  attr1Label: string | null;

  @Column({ type: 'real', nullable: true })
  attr1Id: string | null;

  @Column({ type: 'character varying', length: 50, nullable: true })
  attr2Label: string | null;

  @Column({ type: 'real', nullable: true })
  attr2Id: string | null;

  @Column({ type: 'character varying', length: 50, nullable: true })
  attr3Label: string | null;

  @Column({ type: 'real', nullable: true })
  attr3Id: string | null;
}
