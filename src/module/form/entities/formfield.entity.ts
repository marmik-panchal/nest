import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FormField {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  form_id: string;

  @Column()
  field_name: string;

  @Column()
  field_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
