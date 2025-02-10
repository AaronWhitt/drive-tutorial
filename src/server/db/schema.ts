import { int, text, singlestoreTable } from
"drizzle-orm/singlestore-core";

export const users = singlestoreTable("users_table", {
  id: int("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
});
