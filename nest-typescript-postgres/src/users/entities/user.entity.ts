import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true, length: 256 })
  @IsEmail()
  email_address: string;

  @Column({ length: 256 })
  password: string;

  @Column('varchar', { nullable: true, length: 128 })
  first_name: string;

  @Column('varchar', { nullable: true, length: 128 })
  last_name: string;
}
