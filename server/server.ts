import express from "express";
import path from "path";
const app = express();
const port = 3000;

app.use("/", express.static("dist"));

const options = {
  root: path.join(__dirname, ".."),
};

app.get("/", (req, res) => {
  res.sendFile("views/index.html", options);
});

app.get("/click", (req, res) => {
  res.send("Hello World!");
});

app.get("/sign-up", (req, res) => {
  res.sendFile("views/signIn.html", options);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
