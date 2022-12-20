import { Entity, PrimaryGeneratedColumn, Column,ManyToMany, ManyToOne, JoinTable } from "typeorm"
import { File } from "./File";

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  title: string;

  @Column("text")
  description: string;

  @ManyToOne(() => File)
  @JoinTable()
  banner: string;

  @ManyToMany(() => File, (file) => file.id, {
    cascade: true,
  })
  @JoinTable()
  images: File[];

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP()" })
  created_at: Date;
}

