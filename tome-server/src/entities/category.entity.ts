import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Attribute } from './attribute.entity';
import { Item } from './item.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isDefault: boolean;

  @ManyToOne(() => Project, (project) => project.categories)
  project: Project;

  @OneToMany(() => Attribute, (attribute) => attribute.category)
  attributes: Attribute[];

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
