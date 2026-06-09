require("dotenv").config();
const { Client } = require("pg");

const SQLDROP = `DROP TABLE products;

DROP TABLE categories`;

const SQLCREATE = `CREATE TABLE IF NOT EXISTS categories(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryName VARCHAR(255) NOT NULL,
    total INT
);

CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    productName VARCHAR(255) NOT NULL,
    SKU VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2),
    stock INT,
    capacity INT,
    categoryID INT,
    CONSTRAINT fk_categoryID
        FOREIGN KEY(categoryID)
            REFERENCES categories(id)
);

INSERT INTO categories(categoryName, total) VALUES('RAM', 500);
INSERT INTO categories(categoryName, total) VALUES('CPUs', 400);
INSERT INTO categories(categoryName, total) VALUES('GPUs', 300);
INSERT INTO categories(categoryName, total) VALUES('Motherboards', 200);
INSERT INTO categories(categoryName, total) VALUES('Cases', 100);
INSERT INTO categories(categoryName, total) VALUES('PSUs', 100);
INSERT INTO categories(categoryName,  total) VALUES('Cooling', 100);`;

async function main() {
  console.log("started");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    await client.query(SQLCREATE);
    console.log("done");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

main();
