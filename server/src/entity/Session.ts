import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Session {
  @PrimaryColumn("varchar", { length: 100, nullable: false, unique: true ,primary:true})
  session: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP()" })
  created_at: Date;
}
