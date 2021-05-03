const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
mongoose
  .connect("mongodb://mongodb:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to db");
  });
app.listen(port, () => {
  console.log(`app listening on port: ${3000}`);
});