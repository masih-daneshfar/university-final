import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from "typeorm";
import { Class } from "./Class";
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

  @ManyToMany(() => Class, (classroom) => classroom.id, {
    cascade: true,
  })
  @JoinTable()
  classes: Class[];

  @Column("text")
  body: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP()" })
  created_at: Date;
}
