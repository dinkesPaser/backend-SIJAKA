require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join, dirname } = require("path");

const { env } = require("./config");
const { userRouter } = require("./routers");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: process.env.WHITELISTED_DOMAIN
      ? process.env.WHITELISTED_DOMAIN.split(",")
      : "*",
  })
);

app.use(express.json());
app.use("/api", express.static(`${__dirname}/public`));

app.use("/api/user", userRouter);

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, guys !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});

// tes lag34
// tes imnam
// tes amin
