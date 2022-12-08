import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("varchar", { length: 200 })
  title: string;

  @Column("text")
  description: string;

  @Column("text")
  body: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP()" })
  created_at: Date;
}
