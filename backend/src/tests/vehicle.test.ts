import request from "supertest";
import app from "../app";

describe("Vehicle API", () => {

  it("should create a vehicle", async () => {

    const register = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Admin",
        email: "admin@gmail.com",
        password: "password123",
        role: "admin",
      });

    const token = register.body.token;

    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 45000,
        quantity: 10,
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
it("should return all vehicles", async () => {

  const register = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "admin2@gmail.com",
      password: "password123",
      role: "admin",
    });

  const token = register.body.token;

  await request(app)
    .post("/api/vehicles")
    .set("Authorization", `Bearer ${token}`)
    .send({
      make: "BMW",
      model: "X5",
      category: "SUV",
      price: 65000,
      quantity: 5,
    });

  const response = await request(app)
    .get("/api/vehicles")
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(Array.isArray(response.body.vehicles)).toBe(true);
});
});
