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

app.get("/api/tasks", (req, res) => {
  console.log("hello");
  sql`SELECT * FROM tasks`.then((rows) => {
    res.send(rows);
  });
});
app.get("/api/users", (req, res) => {
  console.log("hello");
  sql`SELECT * FROM userNames`.then((rows) => {
    res.send(rows);
  });
});
app.post("/api/users", (req, res) => {
  console.log("hello");
  const {username} = req.body;
  const {firstname} = req.body;
  const {lastname} = req.body;
  
  sql`INSERT INTO userNames(username, firstname, lastname, lastloggedin) VALUES (${username},${firstname},${lastname}, NOW()) RETURNING *`
  .then((rows) => {
    res.send(rows[0]);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Internal Server Error");
  });
  
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

