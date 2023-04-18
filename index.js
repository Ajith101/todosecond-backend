const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", (req, res) => {
  res.send("hellooiii");
});

mongoose
  .connect(process.env.DB_URL, {
    UseNewUrlParser: true,
    UseUnifiedTopology: true,
  })
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`connected TO mongodb and running on ${process.env.PORT}`);
    })
  )
  .catch((err) => console.log(err));
