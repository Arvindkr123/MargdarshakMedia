import express from "express";
import accountRoutes from "./routes/accounts";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Correct CORS usage
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only the React frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow methods you expect
    allowedHeaders: ["Content-Type", "Authorization"], // Allow headers for the request
  })
);
// Set the APP_PORT to a default if it’s not defined in the environment
const APP_PORT = process.env.APP_PORT || 4000;

app.use("/accounts", accountRoutes);

app.listen(APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`);
});
