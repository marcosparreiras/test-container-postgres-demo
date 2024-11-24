import Pg from "pg";

type Customer = {
  id: number;
  name: string;
};

export class CustumerRepository {
  private sqlClient: Pg.Client;

  public constructor(connectionString: string) {
    this.sqlClient = new Pg.Client(connectionString);
  }

  public async connect() {
    await this.sqlClient.connect();
  }

  public async end() {
    await this.sqlClient.end();
  }

  public async createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS customers (
        id INT NOT NULL,
        name VARCHAR NOT NULL,
        PRIMARY KEY (id)
      )`;
    await this.sqlClient.query(sql);
  }

  public async insert(customer: Customer) {
    const sql = "INSERT INTO customers (id, name) VALUES($1, $2)";
    await this.sqlClient.query(sql, [customer.id, customer.name]);
  }

  public async getAll() {
    const sql = "SELECT * FROM customers";
    const result = await this.sqlClient.query(sql);
    return result.rows;
  }
}
