import { connectionString } from "../setup-jest";
import { CustumerRepository } from "./repository";

describe("Customer Repository", () => {
  let customerRepository: CustumerRepository;

  beforeAll(async () => {
    customerRepository = new CustumerRepository(connectionString);
    await customerRepository.connect();
    await customerRepository.createTable();
  });

  afterAll(async () => {
    await customerRepository.end();
  });

  it("should create and return multiple customers", async () => {
    const customer1 = { id: 1, name: "John Doe" };
    const customer2 = { id: 2, name: "Jane Doe" };
    await customerRepository.insert(customer1);
    await customerRepository.insert(customer2);
    const customers = await customerRepository.getAll();
    expect(customers).toEqual([customer1, customer2]);
  });
});
