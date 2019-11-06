const express = require("express");
const Image = require("../models/image");
const route = express.Router();
const { unlink } = require('fs-extra');
const path = require('path');

route.get("/", async (req, res) => {
  let images = await Image.find();
  res.render("index", { images });
});

route.get("/upload", (req, res) => {
  res.render("upload");
});

route.post("/upload", async (req, res) => {
  let image = new Image();
  image.title = req.body.title;
  image.description = req.body.description;
  image.filename = req.file.filename;
  image.path = "/img/uploads/" + req.file.filename;
  image.originalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;

  try {
    await image.save();
    res.redirect("/");
  } catch (err) {
    console.log("err on creation img", err);
  }
});

route.get("/image/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    res.render("profile", { image });
  } catch (err) {
    console.log(err);
    res.render("error", { error: "Item not found" });
  }
});

route.get("/image/delete/:id", async (req, res) => {
  try {
    const imgDelete = await Image.findByIdAndDelete(req.params.id);
    await unlink(path.resolve('./src/public'+ imgDelete.path));
    res.redirect('/');
  } catch(err) {
    console.log(err);
    res.render("error", { error: "the item can't be delete try againg" });
  }
});

module.exports = route;
