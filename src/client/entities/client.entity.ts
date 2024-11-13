import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  name: string;

  @Column('decimal')
  salary: number;

  @Column()
  company: string;
}
