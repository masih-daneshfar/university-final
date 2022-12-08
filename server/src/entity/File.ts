import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("timestamp", { default: ()=>"CURRENT_TIMESTAMP()" })
  created_at: Date;
}
