require("dotenv").config();
const { Client } = require("pg");

const SQL = `CREATE TABLE IF NOT EXISTS categories(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryName VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    productName VARCHAR(255) NOT NULL,
    categoryID INT,
    CONSTRAINT fk_categoryID
        FOREIGN KEY(categoryID)
            REFERENCES categories(id)
);

INSERT INTO categories(categoryName) VALUES('Vapes');
INSERT INTO categories(categoryName) VALUES('Snus');
INSERT INTO categories(categoryName) VALUES('Cigarettes');
INSERT INTO categories(categoryName) VALUES('Cigars');
INSERT INTO categories(categoryName) VALUES('Books');
INSERT INTO products(productName, categoryID) VALUES('600 Puff Lost Mary', 1);
INSERT INTO products(productName, categoryID) VALUES('1200 Puff Lost Mary', 1);
INSERT INTO products(productName, categoryID) VALUES('1600 Puff Lost Mary', 1);
INSERT INTO products(productName, categoryID) VALUES('2000 Puff Lost Mary', 1);
INSERT INTO products(productName, categoryID)  VALUES('3mg Velo', 2);
INSERT INTO products(productName, categoryID)  VALUES('6mg Velo', 2);
INSERT INTO products(productName, categoryID)  VALUES('9mg Velo', 2);
INSERT INTO products(productName, categoryID)  VALUES('12mg Velo', 2);
INSERT INTO products(productName, categoryID)  VALUES('Marboloro Red', 3);
INSERT INTO products(productName, categoryID)  VALUES('Marboloro Gold', 3);
INSERT INTO products(productName, categoryID)  VALUES('Cuban Cigar 294', 4);
INSERT INTO products(productName, categoryID)  VALUES('Cuban Cigar 354', 4);
INSERT INTO products(productName, categoryID)  VALUES('Dominique Cigar 23', 4);
INSERT INTO products(productName, categoryID)  VALUES('Maple leaf Cigar', 4);
INSERT INTO products(productName, categoryID)  VALUES('Alan Currs easy way to stop smoking', 5);
INSERT INTO products(productName, categoryID)  VALUES('Alan Currs easy way to stop vaping', 5);
INSERT INTO products(productName, categoryID)  VALUES('Alan Currs easy way to stop zyning', 5);`

async function main(){
  console.log("started")
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  })
  console.log("CLIENT MADE")
  await client.connect();
  console.log("connected")
  await client.query(SQL);
  console.log("SQL Queried")
  const result = await client.query(`
    SELECT productName, categoryName 
    FROM products
    INNER JOIN categories
    ON products.categoryID = categories.id
    WHERE categoryName = 'Snus';
    `)
  console.log(result);
  await client.end();
}

main();
