import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("items", (builder) => {
    builder.increments("id").primary();
    builder.string("image").notNullable();
    builder.string("title").notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("items");
}
