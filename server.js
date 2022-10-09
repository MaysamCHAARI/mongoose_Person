const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;
app.use(express.json());
mongoose.connect(
  "mongodb+srv://Maysamchaari:MAYSOUM2016@cluster0.wtv0stv.mongodb.net/?retryWrites=true&w=majority",
  () => console.log("database is connected")
);
app.use("/", require("./routes/userRoutes.js"));
app.listen(port, () => console.log("listning in port 5000"));
