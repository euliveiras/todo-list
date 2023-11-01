import express from "express";
import path from "path";
import dotenv from "dotenv";
import { auth } from "express-openid-connect";
import colors from "tailwindcss/colors";

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

app.get("/home", (req, res) => {
  res.render("home", {
    user: { name: "Matheus" },
    labels: [
      { name: "Pessoal", quantity: 2 },
      { name: "Professional", quantity: 4 },
      { name: "Hobby", quantity: 2 },
    ],
    tasks: [
      { name: "Watch netflix", completed: true, color: colors.red['200'] },
      { name: "Study C programming", completed: false, color: colors.orange['200']},
      { name: "Study Python programming", completed: false, color: colors.purple['200']},
      { name: "Study JS", completed: false, color: colors.blue['200']},
      { name: "Study Math", completed: false, color: colors.yellow['200']},
      { name: "Play The Witcher", completed: false, color: colors.lime['200']},
    ],
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
