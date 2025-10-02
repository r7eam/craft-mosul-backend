import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150, unique: true, nullable: true })
  email: string;

  @Column({ length: 20, unique: true })
  phone: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  role: 'client' | 'worker';

  @Column({ nullable: true })
  neighborhood_id: number;

  @Column({ nullable: true })
  profile_image: string;

  // New fields from database schema
  @Column({ default: false })
  email_verified: boolean;

  @Column({ default: false })
  phone_verified: boolean;

  @Column({ nullable: true })
  last_login: Date;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
