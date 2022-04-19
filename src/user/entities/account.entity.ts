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
import { Income } from './income.entity';
import { User } from '../../common/entities/user.entity';
import { Expense } from './expense.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  name: string;

  @Column()
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @JoinColumn({ name: 'account_id' })
  @OneToMany(() => Income, (income) => income.account)
  incomes: Income[];

  @JoinColumn({ name: 'account_id' })
  @OneToMany(() => Expense, (expense) => expense.account)
  expenses: Expense[];
}
