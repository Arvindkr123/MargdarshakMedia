import express from "express";
import accountRoutes from "./routes/accounts";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(process.env.DATABASE_URL);
const APP_PORT = process.env.APP_PORT;

app.use("/accounts", accountRoutes);

app.listen(APP_PORT, () => {
  console.log("server running on port", APP_PORT);
});
