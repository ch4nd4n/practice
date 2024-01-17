const { drizzle } = require('drizzle-orm/better-sqlite3');
const Database = require('better-sqlite3');
const { sql } = require('drizzle-orm');
const { mutualFundData } = require('./db/schema');

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

async function exec() {
  const result = await db.select().from(mutualFundData).where(sql`scheme_name like 'ICICI%SMALL%'`).limit(5);
  console.log({ result });
}

(async () => {
  await exec();
})();
