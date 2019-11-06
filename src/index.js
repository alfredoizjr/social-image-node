const express = require("express");
const path = require("path");
const multer = require("multer");
const uuid = require("uuid/v4");
const app = express();
const { format } = require('timeago.js')
require("./db");

// Settings
app.set("port", process.env.PORT || 8000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Middlewareuse
app.use((req,res, next) => {
    app.locals.format = format;
 next();
})
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img/uploads"),
  filename: (req, file, cb, filename) => {
    cb(null, uuid() + path.extname(file.originalname));
  }
});
app.use(
  multer({
    storage
  }).single("image")
);
// Routers

app.use(require("./routes/router"));

// Static
app.use(express.static(path.join(__dirname, "public")));
// server listen
app.listen(app.get("port"), () =>
  console.log(`server is online on port: ${app.get("port")}`)
);
