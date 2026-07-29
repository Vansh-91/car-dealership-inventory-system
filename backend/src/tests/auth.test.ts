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