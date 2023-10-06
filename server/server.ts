import express from "express";
const app = express();
const port = 3000;
import path from "path";

app.use("/", express.static("dist"));

app.get("/", (req, res) => {
  const options = {
    root: path.join(__dirname, ".."),
  };
  res.sendFile("views/index.html", options);
});

app.get("/click", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
