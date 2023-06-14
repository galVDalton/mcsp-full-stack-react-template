import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const sql = postgres(process.env.DATABASE_URL);
const app = express();

app.use(express.json());
app.get("/",(req, res) => {
  console.log("Hello World"); });

app.get("/api/visitors", (req, res) => {
  console.log("hello");
  sql`SELECT * FROM visitorLog`.then((rows) => {
    res.send(rows);
  });
});
app.post("/api/visitors", (req, res) => {
  console.log("hello");
  const {firstname} = req.body;
  const {lastname} = req.body;
  
  sql`INSERT INTO visitorLog(firstname, lastname, visiteddate) VALUES (${firstname},${lastname}, NOW()) RETURNING *`
  .then((rows) => {
    res.send(rows[0]);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send(error);
  });
  
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

