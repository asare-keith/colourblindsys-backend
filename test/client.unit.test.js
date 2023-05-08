import request from "supertest";
import express from "express";
import router from "../routes/client.js";

const app = express();

app.use("/", router);

describe("Client routes", () => {
  it("GET /products should return status 200", async () => {
    const response = await request(app).get("/products");
    expect(response.statusCode).toBe(200);
  });

  it("GET /customers should return status 200", async () => {
    const response = await request(app).get("/customers");
    expect(response.statusCode).toBe(200);
  });

  it("GET /transactions should return status 200", async () => {
    const response = await request(app).get("/transactions");
    expect(response.statusCode).toBe(200);
  });

  it("GET /geography should return status 200", async () => {
    const response = await request(app).get("/geography");
    expect(response.statusCode).toBe(200);
  });
});
