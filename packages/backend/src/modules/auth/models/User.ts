import { JSONSchema, Model } from 'objection';

export default class User extends Model {
  id!: number;
  password!: string;

  static get tableName(): string {
    return 'users';
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    };
  }
}
