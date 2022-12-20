import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("varchar", { length: 200 })
  fullName: string;

  @Column("varchar", { length: 200, unique: true })
  email: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP()" })
  created_at: Date;
}
