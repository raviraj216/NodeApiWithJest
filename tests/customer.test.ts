// src/routes/customer.test.ts
import request from "supertest";
import app from "../src/app";
import Customer from "../src/models/customer"; // Mock nodemailer for testing

describe("Customer CRUD Operations", () => {
  let customerId : string;
  let token = process.env.TESTTOKEN;

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({ name: "John Doe", email: "john@example.com", phoneNumber: "1234567890" }).set("Authorization", "Bearer "+token); // Replace with a valid JWT token
      ;

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    customerId = response.body.data._id;
  });

  it("should delete a customer", async () => {
      const email  = "john@example.com";
      const customer = await Customer.findOne({ email });
 
      expect(customer).toHaveProperty("_id");

      let testUserId = customer ? customer._id : '';

      if (testUserId) {
        const response = await request(app)
      .delete(`/customers/${testUserId}`)
      .set("Authorization", "Bearer "+token); // Replace with a valid JWT token

       expect(response.status).toBe(204);
        // Check if the user was deleted from the database
        const deletedUser = await Customer.findById(testUserId);
        expect(deletedUser).toBeNull();

      }
  })
 
});
