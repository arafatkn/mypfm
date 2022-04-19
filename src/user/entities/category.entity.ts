import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../common/entities/user.entity';
import { Income } from './income.entity';
import { Expense } from './expense.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.categories)
  user: User;

  @JoinColumn({ name: 'category_id' })
  @OneToMany(() => Income, (income) => income.category)
  incomes: Income[];

  @JoinColumn({ name: 'category_id' })
  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: Expense[];
}
