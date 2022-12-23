import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { File } from "./File";

export enum PostType {
  home = "home",
  about = "about",
  normal = "normal",
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("enum", {
    enum: PostType,
    nullable: true,
  })
  type: PostType;


  @Column("varchar", { length: 200 })
  title: string;

  @OneToOne(() => File)
  @JoinColumn()
  banner: File;

  @Column("text")
  description: string;

  @Column("text")
  body: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP()" })
  created_at: Date;
}
