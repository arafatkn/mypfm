import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../common/entities/user.entity';
import { Category } from './category.entity';
import { Account } from './account.entity';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  account_id: number;

  @Column()
  category_id: number;

  @Column()
  expense_date: Date;

  @Column()
  amount: number;

  @Column()
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.expenses)
  user: User;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(() => Category, (category) => category.expenses)
  category: Category;

  @JoinColumn({ name: 'account_id' })
  @ManyToOne(() => Account, (account) => account.expenses)
  account: Account;
}
