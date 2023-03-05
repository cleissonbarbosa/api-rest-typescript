import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  ADMIN = "administrator",
  EDITOR = "editor",
  SUBSCRIBE = "subscribe",
}

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({unique: true})
  public email!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.SUBSCRIBE,
  })
  public role!: UserRole;

  @Column()
  public password!: string;
}