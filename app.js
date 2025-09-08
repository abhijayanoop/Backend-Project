const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();

app.use(bodyParser.json());

// use this middleware to set these headers to prevent CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

mongoose
  .connect(
    "mongodb+srv://abhijayanoop007:8Hkj0rYYNhi1Vx2B@cluster0.fa1heom.mongodb.net/messages?w=majority&appName=Cluster0"
  )
  .then((result) => {
    app.listen(8081);
  })
  .catch((err) => console.log(err));
