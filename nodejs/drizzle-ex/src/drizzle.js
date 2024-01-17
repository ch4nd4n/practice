const { drizzle } = require("drizzle-orm/better-sqlite3");
const Database = require("better-sqlite3");

const { text, integer, sqliteTable } = require("drizzle-orm/sqlite-core");
// TODO Get DB config from Environment
const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

const users = sqliteTable("users", {
  id: text("id"),
  name: text("name").notNull(),
  age: integer("age"),
});

async function exec() {
  return db.select().from(users);
}

(async () => {
  console.time();

  let result = await exec();
  console.log({ result });
  console.timeEnd();
  console.time();
  for (let i = 0; i < 1000; i += 1) {
    result = exec();
  }
  console.timeEnd();
})();
