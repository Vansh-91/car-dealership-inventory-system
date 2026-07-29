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
it("should search vehicles by make", async () => {
  const register = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "searchadmin@gmail.com",
      password: "password123",
      role: "admin",
    });

  const token = register.body.token;

  await request(app)
    .post("/api/vehicles")
    .set("Authorization", `Bearer ${token}`)
    .send({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
      price: 50000,
      quantity: 5,
    });

  await request(app)
    .post("/api/vehicles")
    .set("Authorization", `Bearer ${token}`)
    .send({
      make: "BMW",
      model: "X5",
      category: "SUV",
      price: 70000,
      quantity: 3,
    });

  const response = await request(app)
    .get("/api/vehicles/search?make=Toyota")
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.vehicles.length).toBeGreaterThan(0);
  expect(response.body.vehicles[0].make).toBe("Toyota");
});
it("should update a vehicle", async () => {
  const register = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "updateadmin@gmail.com",
      password: "password123",
      role: "admin",
    });

  const token = register.body.token;

  const createResponse = await request(app)
    .post("/api/vehicles")
    .set("Authorization", `Bearer ${token}`)
    .send({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
      price: 50000,
      quantity: 5,
    });

  const vehicleId = createResponse.body.vehicle._id;

  const response = await request(app)
    .put(`/api/vehicles/${vehicleId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      make: "Toyota",
      model: "Fortuner Legender",
      category: "SUV",
      price: 55000,
      quantity: 8,
    });

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.vehicle.model).toBe("Fortuner Legender");
});
it("should allow admin to delete a vehicle", async () => {
  const register = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "deleteadmin@gmail.com",
      password: "password123",
      role: "admin",
    });

  const token = register.body.token;

  const createResponse = await request(app)
    .post("/api/vehicles")
    .set("Authorization", `Bearer ${token}`)
    .send({
      make: "BMW",
      model: "X5",
      category: "SUV",
      price: 65000,
      quantity: 5,
    });

  const vehicleId = createResponse.body.vehicle._id;

  const response = await request(app)
    .delete(`/api/vehicles/${vehicleId}`)
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
});
it("should not allow a normal user to delete a vehicle", async () => {
  const admin = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "admin-delete2@gmail.com",
      password: "password123",
      role: "admin",
    });

  const adminToken = admin.body.token;

  const user = await request(app)
    .post("/api/auth/register")
    .send({
      name: "User",
      email: "user-delete@gmail.com",
      password: "password123",
      role: "user",
    });

  const userToken = user.body.token;

  const vehicle = await request(app)
    .post("/api/vehicles")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      make: "Audi",
      model: "A6",
      category: "Sedan",
      price: 45000,
      quantity: 5,
    });

  const response = await request(app)
    .delete(`/api/vehicles/${vehicle.body.vehicle._id}`)
    .set("Authorization", `Bearer ${userToken}`);

  expect(response.status).toBe(403);
});
it("should purchase a vehicle", async () => {
  const register = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "purchase@gmail.com",
      password: "password123",
      role: "admin",
    });

  const token = register.body.token;

  const vehicle = await request(app)
    .post("/api/vehicles")
    .set("Authorization", `Bearer ${token}`)
    .send({
      make: "Tesla",
      model: "Model 3",
      category: "Electric",
      price: 60000,
      quantity: 3,
    });

  const response = await request(app)
    .post(`/api/vehicles/${vehicle.body.vehicle._id}/purchase`)
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(response.body.vehicle.quantity).toBe(2);
});
it("should not purchase an out-of-stock vehicle", async () => {
  const register = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "purchase2@gmail.com",
      password: "password123",
      role: "admin",
    });

  const token = register.body.token;

  const vehicle = await request(app)
    .post("/api/vehicles")
    .set("Authorization", `Bearer ${token}`)
    .send({
      make: "Tesla",
      model: "Model X",
      category: "Electric",
      price: 80000,
      quantity: 0,
    });

  const response = await request(app)
    .post(`/api/vehicles/${vehicle.body.vehicle._id}/purchase`)
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(400);
});
it("should allow admin to restock a vehicle", async () => {
  const register = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "restock@gmail.com",
      password: "password123",
      role: "admin",
    });

  const token = register.body.token;

  const vehicle = await request(app)
    .post("/api/vehicles")
    .set("Authorization", `Bearer ${token}`)
    .send({
      make: "Honda",
      model: "City",
      category: "Sedan",
      price: 25000,
      quantity: 2,
    });

  const response = await request(app)
    .post(`/api/vehicles/${vehicle.body.vehicle._id}/restock`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      quantity: 5,
    });

  expect(response.status).toBe(200);
  expect(response.body.vehicle.quantity).toBe(7);
});
it("should not allow normal user to restock", async () => {
  const admin = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "restockadmin@gmail.com",
      password: "password123",
      role: "admin",
    });

  const adminToken = admin.body.token;

  const user = await request(app)
    .post("/api/auth/register")
    .send({
      name: "User",
      email: "restockuser@gmail.com",
      password: "password123",
      role: "user",
    });

  const userToken = user.body.token;

  const vehicle = await request(app)
    .post("/api/vehicles")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
      price: 50000,
      quantity: 2,
    });

  const response = await request(app)
    .post(`/api/vehicles/${vehicle.body.vehicle._id}/restock`)
    .set("Authorization", `Bearer ${userToken}`)
    .send({
      quantity: 5,
    });

  expect(response.status).toBe(403);
});
});
