import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log(process.env.DATABASE_URL);

app.listen(4000, () => {
  console.log("server running on port", 4000);
});
