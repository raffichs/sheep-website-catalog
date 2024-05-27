const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/User");
const imageDownloader = require("image-downloader");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const SheepModel = require("./models/Sheep");

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "ahdajshddasd";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
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
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "Strict",
            })
            .json(user);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(500).json("not found");
  }
});

app.get("/admin", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, admin) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      res.json(admin);
    });
  } else {
    res.json(null);
  }
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "sheep" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.post("/cards", async (req, res) => {
  const {
    name,
    price,
    type,
    age,
    height,
    weight,
    color,
    desc,
    category,
    status,
    addedPhotos,
  } = req.body;
  const cardDoc = await SheepModel.create({
    name,
    price,
    type,
    age,
    height,
    weight,
    color,
    desc,
    category,
    status,
    photos: addedPhotos,
  });
  res.json(cardDoc);
});

app.get("/cards", async (req, res) => {
  try {
    const dataCards = await SheepModel.find().sort({ createdAt: -1 });
    res.json(dataCards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cards" });
  }
});

app.get("/cards/:id", async (req, res) => {
  try {
    const card = await SheepModel.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch card" });
  }
});

app.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      type,
      age,
      height,
      weight,
      color,
      desc,
      category,
      status,
      photos,
    } = req.body;

    const card = await SheepModel.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    card.set({
      name,
      price,
      type,
      age,
      height,
      weight,
      color,
      desc,
      category,
      status,
      photos,
    });

    await card.save();
    res.json("ok");
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ message: "Error updating card" });
  }
});

app.delete('/cards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await SheepModel.findByIdAndDelete(id);
    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete card', error });
  }
});


app.listen(3001, () => {
  console.log("Server is running...");
});
