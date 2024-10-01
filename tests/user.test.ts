// src/tests/user.test.ts
import request from "supertest";
import app from "../src/app";
import User from "../src/models/user"; // Mock nodemailer for testing
import bcrypt from "bcrypt";

describe("User API", () => {
  let token : string;
  it("should create a user",async () => {
    
      const response = await request(app)
        .post("/users/create")
        .send({ username: "John Doe", email: "john@example.com", password: "123456" }); // Replace with a valid JWT token
      expect(response.status).toBe(201);
      console.log("response",response.body);
      expect(response.body).toHaveProperty("message", "User created successfully");
  })

  it("should login a user",async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({  email: "john@example.com", password: "123456" }); 
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    token = response.body.token;

  })

  it("should delete a user", async () => {
    // Create a test user and save it to the database
    const email  = "john@example.com";
    const user = await User.findOne({ email });

    expect(user).toHaveProperty("_id");

    let testUserId = user ? user._id : '';


    // Authenticate or obtain a valid JWT token for authorization (if needed)

    // Send a request to delete the user
    // eslint-disable-next-line no-underscore-dangle
     const response = await request(app)
      .delete(`/users/${testUserId}`)
      .set("Authorization", "Bearer "+token); //  // Replace with a valid JWT token

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "User deleted successfully");

    // Check if the user was deleted from the database
    const deletedUser = await User.findById(testUserId);
    expect(deletedUser).toBeNull();
  });
});
