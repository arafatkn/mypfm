module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'arafatkn',
  password: '',
  database: 'nest_pfm',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
