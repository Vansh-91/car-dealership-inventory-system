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
it("should not register a user with an existing email", async () => {
  const user = {
    name: "Vansh",
    email: "duplicate@gmail.com",
    password: "password123",
  };

  await request(app).post("/api/auth/register").send(user);

  const response = await request(app)
    .post("/api/auth/register")
    .send(user);

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("User already exists");
});
it("should not login with an incorrect password", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Vansh",
      email: "wrongpass@gmail.com",
      password: "password123",
    });

  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "wrongpass@gmail.com",
      password: "wrongpassword",
    });

  expect(response.status).toBe(401);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Invalid email or password");
});
it("should not login with an unregistered email", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "nouser@gmail.com",
      password: "password123",
    });

  expect(response.status).toBe(401);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Invalid email or password");
});