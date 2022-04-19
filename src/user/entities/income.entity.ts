import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { Category } from './category.entity';
import { User } from '../../common/entities/user.entity';

@Entity('incomes')
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  account_id: number;

  @Column()
  category_id: number;

  @Column()
  income_date: Date;

  @Column()
  amount: number;

  @Column()
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.incomes)
  user: User;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(() => Category, (category) => category.incomes)
  category: Category;

  @JoinColumn({ name: 'account_id' })
  @ManyToOne(() => Account, (account) => account.incomes)
  account: Account;
}
