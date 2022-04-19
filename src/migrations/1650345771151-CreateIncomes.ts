import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateIncomes1650345771151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'incomes',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'bigint',
          },
          {
            name: 'category_id',
            type: 'bigint',
          },
          {
            name: 'account_id',
            type: 'bigint',
          },
          {
            name: 'income_date',
            type: 'date',
            default: 'CURRENT_DATE',
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 16,
            scale: 2,
          },
          {
            name: 'note',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        indices: [
          {
            name: 'idx_incomes_user_id',
            columnNames: ['user_id'],
          },
          {
            name: 'idx_incomes_category_id',
            columnNames: ['category_id'],
          },
          {
            name: 'idx_incomes_account_id',
            columnNames: ['account_id'],
          },
          {
            name: 'idx_incomes_user_category',
            columnNames: ['user_id', 'category_id'],
          },
          {
            name: 'idx_incomes_user_account',
            columnNames: ['user_id', 'account_id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('incomes');
  }
}
