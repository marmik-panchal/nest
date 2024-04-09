import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class FormFillData {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  form_entry_id: number;

  @Column()
  form_field_id: number;

  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  @Column()
  form_field_value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
