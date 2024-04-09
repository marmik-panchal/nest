import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Form {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  //@OneToMany(() => FormField, (formField) => formField.form)
  //@JoinColumn()
  //form_fields: FormField[];

  // @OneToMany(() => FormFillData, (formFillData) => formFillData.form)
  // @JoinColumn()
  // form_data: FormField[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
