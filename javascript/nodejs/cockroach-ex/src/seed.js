const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");


async function insertRow(client) {
  const insertStmt = 'insert into accounts (id, balance) values($1, 5000);'
  const rs = await client.query(insertStmt, [uuidv4()]);
  return rs;
}

async function readRows(client) {
  const readStmt = 'select * from accounts;';
  const rs = await client.query(readStmt);
  return rs.rows[0]
}

(async () => {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({
    connectionString,
    application_name: "$ docs_simplecrud_node-postgres",
  });
  const client = await pool.connect();
  console.log('connected');
  // const rs = await insertRow(client);
  const rs = await readRows(client);

  console.log({ rs });
  await client.release();
  await pool.end();
  console.log('end');
})();
