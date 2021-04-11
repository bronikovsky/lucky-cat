import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('users', table => {
      table.uuid('id').primary();
      table.string('password', 60);
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('users');
}

