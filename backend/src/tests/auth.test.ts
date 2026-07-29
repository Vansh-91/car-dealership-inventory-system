import request from "supertest";
import app from "../app";

describe("Authentication", () => {

    describe("POST /api/auth/register", () => {

        it("should create a new user", async () => {

            const response = await request(app)
                .post("/api/auth/register")
                .send({
                    name: "Vansh",
                    email: "vansh@gmail.com",
                    password: "password123"
                });

            expect(response.status).toBe(201);

        });

    });

});
it("should login an existing user", async () => {
  // Register first
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Vansh",
      email: "vansh@gmail.com",
      password: "password123",
    });

  // Then login
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "vansh@gmail.com",
      password: "password123",
    });

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.token).toBeDefined();
});