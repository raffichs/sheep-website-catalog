const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/User");
const imageDownloader = require("image-downloader");
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "ahdajshddasd";

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const user = await UserModel.create({
      name,
      username,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(user);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      jwt.sign(
        { username: user.username, id: user._id },
        jwtSecret,
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "Strict",
            })
            .json("pass ok");
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(500).json("not found");
  }
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = 'sheep' + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

app.listen(3001, () => {
  console.log("Server is running...");
});
