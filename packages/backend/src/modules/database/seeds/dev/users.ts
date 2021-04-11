import { Knex } from 'knex';

const id = '28a89a60-129e-420a-9065-0e446940127a';
// Hashed: `password`
const password = '$2a$10$ZjXdEJX1fujlfz5ZzJFq.eHs1kDhGS5pkEnF3IRSILXPE2M.5ozli';

exports.seed = async (knex: Knex) => {
  await knex('users').del()
  await knex('users').insert([
    { id, password },
  ]);
};
