import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Gallery } from "./Gallery";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({})
  extension: string;

  @ManyToMany(() => Gallery)
  @JoinTable()
  galleryImages: Gallery[];
  
  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP()" })
  created_at: Date;
}
