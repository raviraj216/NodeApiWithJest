// import express from "express";
// import { Application } from "express";

import express, {
  Application, Request, Response, NextFunction,
} from "express";

import mongoose, { ConnectOptions } from "mongoose";

import bodyParser from "body-parser";
import cors from "cors";
import customerRoutes from "./routes/customer";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes"; 
import productRoutes from "./routes/productRoutes"; // Import the authentication routes
 
import dotenv from "dotenv";


// Create the express app and  import the type of app from express;
const app: Application = express();

const PORT: number = Number(process.env.PORT) || 8000;



//configure env;
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Routes
app.use("/customers", customerRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.use("/products", productRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});




// Parser
// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

app.get("/", (req, res) => {
  res.send("<h1>Welcome To JWT Authentication </h1>");
});

// Listen the server
const mongoUri = process.env.DATABASE_URL || "";
console.log("process.env.NODE_ENV",process.env.NODE_ENV)
mongoose
  .connect(mongoUri, {
  } as ConnectOptions)
  .then((res) => {
    console.log("Connected to MongoDB");
    if (process.env.NODE_ENV !== 'test') {

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.log(
      "Initial Distribution API Database connection error occurred -",
      err,
    );
  });

// app.listen(PORT, async () => {
//   console.log(`🗄️  Server Fire on http:localhost:${PORT}`);
// console.log("databaseurl",process.env.DATABASE_URL)
//   // Connect To The Database
//   try {
//     await mongoose.connect(
//       process.env.DATABASE_URL as string
//     );
//     console.log("🛢️  Connected To Database");
//   } catch (error) {
//     console.log("⚠️ Error to connect Database",error);
//   }
// });
export default app;