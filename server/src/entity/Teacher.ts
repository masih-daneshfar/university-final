import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from "typeorm";
import { File } from "./File";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fullName?: string;

  @Column("text")
  description: string;

  @ManyToOne(() => File)
  @JoinTable()
  avatar: File;

  @Column("text")
  body: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP()" })
  created_at: Date;
}
