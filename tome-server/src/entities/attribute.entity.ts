import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { ItemAttribute } from './item-attribute.entity';
import { User } from './user.entity';

export enum AttributeType {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
  TEXT = 'text',
  DATETIME = 'datetime',
  BOOLEAN = 'boolean',
}

@Entity('attributes')
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: AttributeType, default: AttributeType.STRING })
  type: AttributeType;

  @Column()
  isDefault: boolean;

  @ManyToOne(() => User, (user) => user.attributes)
  user: User;

  @ManyToOne(() => Category, (category) => category.attributes)
  category: Category;

  @OneToMany(() => ItemAttribute, (itemAttribute) => itemAttribute.attribute)
  itemAttributes: ItemAttribute[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
