import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
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

  @ManyToOne(() => User, (user) => user.categories)
  user: User;

  @ManyToMany(() => Project, (project) => project.categories)
  projects: Project[];

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
