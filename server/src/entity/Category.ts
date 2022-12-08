import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  title: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP()" })
  created_at: Date;
  @Column("boolean", { default: ()=>false })
  is_tag: boolean;
}
