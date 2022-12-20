import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


export enum UserRoles {
  USER = "USER",
  ADMIN = "ADMIN",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column("varchar", { length: 100 })
  email: string;

  @Column("varchar", { length: 200 })
  password: string;

  @Column("enum",{ enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP()" })
  created_at: Date;
}
