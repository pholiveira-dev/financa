require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    pool: { min: 2, max: 10 }
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { tableName: 'knex_migrations' },
    pool: { min: 2, max: 10 }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { tableName: 'knex_migrations' },
    pool: { min: 2, max: 10 }
  }
};
