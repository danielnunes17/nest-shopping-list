import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeOrm';
@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'description', type: 'varchar', nullable: true, length: 255 })
  description?: string;

  @Column({ name: 'quantity', type: 'int' })
  quantity: number;

  constructor(item?: Partial<Item>) {
    super();
    this.name = item?.name;
    this.description = item?.description;
    this.quantity = item?.quantity;
  }
}
