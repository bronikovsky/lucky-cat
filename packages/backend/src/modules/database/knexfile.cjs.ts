/* eslint-disable @typescript-eslint/no-var-requires */
import path = require('path');
require('../config/loadConfig.cjs')(path.join(__dirname, '..', '..', '..'));
/* eslint-enable @typescript-eslint/no-var-requires */

const common = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: parseInt(process.env.DB_PORT as string),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'versions'),
  },
};

module.exports = {
  development: {
    ...common,
    seeds: {
      directory: [
        path.join(__dirname, 'seeds', 'dev'),
        // path.join(__dirname, 'seeds', 'prod'),
      ],
    },
  },
  production: {
    ...common,
    seeds: {
      // directory: path.join(__dirname, 'seeds', 'prod'),
    },
  },
};
