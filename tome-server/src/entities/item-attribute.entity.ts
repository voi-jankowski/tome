import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { Attribute } from './attribute.entity';

@Entity('item_attributes')
export class ItemAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true }) // String values
  stringValue: string | null;

  @Column({ type: 'int', nullable: true }) // Number values
  numberValue: number | null;

  @Column({ type: 'boolean', nullable: true }) // Boolean values
  booleanValue: boolean | null;

  @Column({ type: 'date', nullable: true }) // Date values
  dateValue: Date | null;

  @ManyToOne(() => Item, (item) => item.itemAttributes)
  item: Item;

  @ManyToOne(() => Attribute, (attribute) => attribute.itemAttributes)
  attribute: Attribute;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
