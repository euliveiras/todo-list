import express from "express";
import path from "path";
import dotenv from "dotenv";
import { auth } from "express-openid-connect";
import { requiresAuth } from "express-openid-connect";

dotenv.config();

const port = process.env.PORT || 3000;
const secret = process.env.SECRET;
const baseURL = process.env.BASE_URL;
const clientID = process.env.CLIENT_ID;
const issuerBaseURL = process.env.ISSUER_BASE_URL;

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret,
  baseURL,
  clientID,
  issuerBaseURL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.set("view engine", "ejs");
app.use(auth(config));
app.use("/", express.static("dist"));

const options = {
  root: path.join(__dirname, ".."),
};

app.get("/", (req, res) => {
  res.render("index", { title: "login", message: "Olá mundo" });
});

app.get("/click", (req, res) => {
  res.send("Hello World!");
});

app.get("/sign-up", (req, res) => {
  res.sendFile("views/signIn.html", options);
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
