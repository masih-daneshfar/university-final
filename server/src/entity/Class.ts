import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Teacher } from "./Teacher";

export enum Days {
  Saturday = "شنبه",
  Sunday = "یک‌شنبه",
  Monday = "دو‌شنبه",
  Tuesday = "سه‌شنبه",
  Wednesday = "چهار‌شنبه",
  thursday = "پنج‌شنبه",
  Friday = "جمعه",
}

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  title: string;

  @Column("text", { array: true })
  days: Days[];

  @ManyToMany(() => Teacher, (teacher) => teacher.id, {
    cascade: true,
  })
  @JoinTable()
  teachers: Teacher[];

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP()" })
  created_at: Date;
}
