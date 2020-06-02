import Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("points", (builder) => {
    builder.increments("id").primary();
    builder.string("image").notNullable();
    builder.string("name").notNullable();
    builder.string("email").notNullable();
    builder.string("whatsapp").notNullable();
    builder.decimal("latitude").notNullable();
    builder.decimal("longitude").notNullable();
    builder.string("city").notNullable();
    builder.string("uf", 2).notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("points");
}
