// src/entities/user.entity.ts
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    JoinColumn,
    OneToOne,
    Unique,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { hash } from 'bcrypt';
  
  @Entity('users')
  @Unique(['username', 'email'])
  export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id!: string;
  
    @Column({ unique: true })
    username: string;
  
    @Column({ nullable: false, unique: true })
    email: string;
  
    @Column({ nullable: false })
    password_hash: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;
  
    @BeforeInsert()
    async hashPassword() {
      this.password_hash = await hash(this.password_hash, 15);
    }
  
    constructor(
      username: string,
      email: string,
      password_hash: string,
    ) {
      this.username = username;
      this.email = email;
      this.password_hash = password_hash;
    }
  }
  