import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Income } from '../../user/entities/income.entity';
import { Account } from '../../user/entities/account.entity';
import { Expense } from '../../user/entities/expense.entity';
import { Category } from '../../user/entities/category.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: 'user_id' })
  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @JoinColumn({ name: 'user_id' })
  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @JoinColumn({ name: 'user_id' })
  @OneToMany(() => Income, (income) => income.user)
  incomes: Income[];

  @JoinColumn({ name: 'user_id' })
  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    if (!/^\$2a\$\d+\$/.test(this.password)) {
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async checkPassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
