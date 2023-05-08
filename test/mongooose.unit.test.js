import request from "supertest";
// import app from "../app";
import User from "../models/User";

describe("GET /users/:id", () => {
  it("should return the user with the given ID", async () => {
    const user = new User({ name: "John Doe", email: "johndoe@example.com" });
    await user.save();

    const response = await request(app).get(`/users/${user._id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(user.name);
    expect(response.body.email).toBe(user.email);
  });

  it("should return a 404 error if the user is not found", async () => {
    const response = await request(app).get("/users/12345");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });
});
