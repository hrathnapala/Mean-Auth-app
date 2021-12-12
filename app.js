const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/database");
const passport = require("passport");
const apiUrl = "/api/v1";

//connect to database
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});
mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});

//initialize app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use(passport.initialize());

require("./config/passport")(passport);

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//port
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

//routes
app.use(`${apiUrl}/users`, require("./routes/users"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//server running code
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
