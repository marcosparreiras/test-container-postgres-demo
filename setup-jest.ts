import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

let postgresContainer: StartedPostgreSqlContainer;
let connectionString: string;

jest.setTimeout(8000);

beforeAll(async () => {
  postgresContainer = await new PostgreSqlContainer().start();
  connectionString = postgresContainer.getConnectionUri();
});

afterAll(async () => {
  await postgresContainer.stop();
});

process.on("SIGINT", async () => {
  if (postgresContainer) {
    await postgresContainer.stop();
  }
  process.exit();
});

export { connectionString };
