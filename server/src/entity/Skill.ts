import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  title: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP()" })
  created_at: Date;
  
}
