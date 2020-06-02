import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("point_items", (builder) => {
    builder.increments("id").primary();
    builder
      .integer("point_id")
      .notNullable()
      .references("id")
      .inTable("points");

    builder.integer("item_id").notNullable().references("id").inTable("items");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("point_items");
}
