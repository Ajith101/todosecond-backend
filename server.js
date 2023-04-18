const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const Todos = require("./routes/todoRoute");

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/todos", Todos);

mongoose
  .connect(process.env.DB_URL, {
    UseUnifiedTopology: true,
    UseNewUrlParser: true,
  })
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`connected MOngodb and running on port ${process.env.PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
